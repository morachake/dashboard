import { useAuth } from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, CardBody } from 'reactstrap';

import config from 'config';
import { ProjectDetailsForm } from './InputForm/ProjectdetailsForm';
import  Certandloc  from './InputForm/Certand loc';
import { validateFormStep } from './InputForm/formValidator';
import CustomModal from 'components/Reusable/CustomModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const subCountyWards = {
    Mvita: ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
    Likoni: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
    Changamwe: ["Port Reitz", "Kipevu", "Airport", "Miritini", "Chaani"],
    Kisauni: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
    Nyali: ["Frere Town", "Ziwa la Ng’ombe", "Mkomani", "Kongowea", "Kadzandani"],
    Jomvu: ["Jomvu Kuu", "Magongo", "Mikindini"]
};


const initialFormData = {
    is_project: true,
    project_name: '',
    description: '',
    contractor_details: '',
    financier:'',
    status: '',
    project_status_percentage: '',
    remarks: '',
    start_date: '',
    end_date: '',
    contract_sum: '',
    certificates: [],
    recommendations: '',
    locations: [],
    milestones:'',
    program_id:'',
    before_images_url: '',
    after_images_url: '',
};

export default function ProjectForm() {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const { user } = useAuth();
    const [wards, setWards] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState({title:"",message:"",type:""});
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [programs,setPrograms] = useState([])
    const [locationErrors, setLocationErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        ...initialFormData,
        user_id: user.id
    });
    const toggleModal = () => {
        setShowModal(!showModal)
        setCurrentStep(1)
    }
    const [formValid, setFormValid] = useState({});
    // const [updatedLocations ,setUpdatedLocations] = useState([])
    const  validateCurrentStep = () =>{
        const {isValid, errors} = validateFormStep(currentStep,formData)
        setFormErrors(errors)
        setFormValid(isValid)
        return isValid
    }
    const handleLocationChange = ( newLocationData) => {

        const formattedLocations  = newLocationData.map(location =>({
            subcounty: location.subCounty,
            ward: location.label,
        }))

             setSelectedLocations(newLocationData)

             setFormData((prevFormData)=>({
                ...prevFormData,
                locations: formattedLocations
             }))
    };

    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch(`${config.backendURL}/program`, {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const userprograms = data.filter(program => program.director_id === user.id)
                console.log("Fetched programs:", userprograms);
                setPrograms(userprograms);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        fetchPrograms();
    }, []);
  

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            setIsSubmitting(true);
            saveData();
            console.log("Submit Locations",formData.locations)
        } else {
            console.error('Form validation failed');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    const saveData = () => {
        const jsonPayload = {
            ...formData,
            user_id: user.id

        };
        const accessToken = localStorage.getItem('accessToken');
        fetch(`${config.backendURL}/create_form`, {
            method: 'POST',
            body: JSON.stringify(jsonPayload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${accessToken}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error || data.errorMessage) { 
                    throw new Error(data.errorMessage || 'Unknown error occurred');
                }   
                toast.success('Form submitted successfully!');
                setShowModal(true);
                clearForm()
                setCurrentStep(1)
            })
            .catch(err => {
                console.error("Error during submission:", err.message);
                toast.error('An Eror Occure During submission ! Please try again',);
                setShowModal(true);
            })
            .finally(() => {setIsSubmitting(false)});
    };
    const clearForm = () => {
        setFormData({ ...initialFormData });
        setWards([]);
    }

    const validateCertificateData = (certificate) => {
        let errors = {};
        if (!certificate.certificate_number) {
            errors.certificate_number = 'Certificate number is required';
        }
        if (!certificate.amount_certified || isNaN(parseFloat(certificate.amount_certified))) {
            errors.amount_certified = 'Valid amount certified is required';
        }
        return errors;
    };
 
    const handleCertificateItemChange = (event, index) => {
        const { name, value } = event.target;
        const updatedCertificates = [...formData.certificates];
        updatedCertificates[index] = { ...updatedCertificates[index], [name]: value };
        setFormData({ ...formData, certificates: updatedCertificates });
    };

    const addCertificateItem = () => {
        const newCertificate = { certificate_number: '', amount_certified: '' };
        setFormData((prevFormData) => ({
            ...prevFormData,
            certificates: [...prevFormData.certificates, newCertificate],
        }));
    };

    const removeCertificateItem = (index) => {
        const updatedCertificates = [...formData.certificates];
        updatedCertificates.splice(index, 1);
        setFormData({ ...formData, certificates: updatedCertificates });
    };

    const requiredValidator = value => value.trim() ? '' : 'required';
    const numberValidator = value => !isNaN(value) && value.trim() !== '' ? '' : 'number';

    const handleValidationStateChange = (name, isValid) => {
        setFormValid({ ...formValid, [name]: isValid });
    };
    const isFormValid = () => {
        return Object.values(formValid).every(Boolean);
    };
    const totalSteps = 2

    const nextStep = () => {
        if(validateCurrentStep()){
           if (currentStep < 2) { 
            setCurrentStep(currentStep + 1);
        }  
        }
    };

    const prevStep = () => {
            if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    const renderStep = () => {
        switch (currentStep) {
           
            case 1:
                return <ProjectDetailsForm
                    handleInputChange={handleInputChange}
                    formData={formData}
                    handleValidationStateChange={handleValidationStateChange}
                    requiredValidator={requiredValidator}
                    numberValidator={numberValidator}
                    formErrors={formErrors}
                    index={0}
                    programs={programs}
                />
             case 2:
                return <Certandloc
                    caption="Project payment Certificate"
                    formData={formData}
                    handleCertificateItemChange={handleCertificateItemChange}
                    validateCertificateData={validateCertificateData}
                    removeCertificateItem={removeCertificateItem}
                    addCertificateItem={addCertificateItem}
                    onLocationChange={handleLocationChange}
                    locationErrors={locationErrors}
                    wards={wards}
                    subCountyWards={subCountyWards}
                /> 
            default:
                return null
        }
    }
    return (
        <Card >
           <CardBody>
                <Form onSubmit={handleSubmit}>
                    {renderStep()}
                    <div className="form-navigation">
                        {currentStep > 1 && (
                            <Button onClick={prevStep} type='button' color='secondary'>Previous</Button>
                            
                        )}
                        {currentStep < totalSteps && (
                            <Button onClick={nextStep} type='button' color='primary'>
                                
                                Next</Button>
                        )}
                        {currentStep === totalSteps && (
                            <Button type="submit" color='primary' disabled={!isFormValid() || isSubmitting}>
                                {isSubmitting ? "Submitting...." : "Submit"}

                            </Button>
                        )}
                    </div>
                </Form>
            </CardBody>
        </Card>
    );
}
