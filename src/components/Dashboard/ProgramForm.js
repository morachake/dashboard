import { useAuth } from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, CardBody } from 'reactstrap';
import config from 'config';
import { ProgramDetailsForm } from './InputForm/ProgramDetailsForm';
import { validateFormStep } from './InputForm/formValidator';
import { Certandloc } from './InputForm/Certand loc';

const initialFormData ={ 
    project_name: '',
    description: '',
    contract_sum: '',
    contract_sum_usd:'',
    contractor_details: '',
    status: '',
    program_id: '',
    project_status_percentage: '',
    financier: '',
    start_date: '',
    end_date: '',
    milestones: '',
};

const subCountyWards = {
    Mvita: ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
    Likoni: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
    Changamwe: ["Port Reitz", "Kipevu", "Airport", "Miritini", "Chaani"],
    Kisauni: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
    Nyali: ["Frere Town", "Ziwa la Ng’ombe", "Mkomani", "Kongowea", "Kadzandani"],
    Jomvu: ["Jomvu Kuu", "Magongo", "Mikindini"]
};

export default function ProgramForm() {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [programs,setPrograms] = useState([])
    const { user } = useAuth();
    const [formErrors, setFormErrors] = useState({});
    const [locationErrors, setLocationErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1)
    const [wards, setWards] = useState([]);
    const [formData, setFormData] = useState({
        ...initialFormData,
        user_id: user.id
    });
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

  

    const [formValid, setFormValid] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            setIsSubmitting(true);
            saveData();
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
                clearForm()
            })
            .catch(err => {
                console.error("Error during submission:", err.message);   
            })
            .finally(() => {setIsSubmitting(false)});
    };
    const clearForm = () => {
        setFormData({ ...initialFormData });
        setWards([]);
    }

    const validateLocation = (index, subcounty, ward) => {
        const newLocationErrors = { ...locationErrors };
        newLocationErrors[index] = {
            subcounty: subcounty ? '' : 'Subcounty is required',
            ward: ward ? '' : 'Ward is required',
        };

        setLocationErrors(newLocationErrors);
    };
    const handleLocationChange = (index, key, value) => {
            let updatedLocations = [...formData.locations];

            if (key === 'subcounty') {
                if (value === 'all') {
                    // Create an array with every subcounty and its wards
                    updatedLocations = Object.entries(subCountyWards).flatMap(([subcounty, wards]) => {
                        return wards.map(ward => ({ subcounty, ward }));
                    });
                } else {
                    // If a specific subcounty is selected, update only that entry
                    const relatedWards = subCountyWards[value];
                    updatedLocations[index] = { subcounty: value, ward: relatedWards[0] };
                }
            } else {
                updatedLocations[index][key] = value;
            }
            setFormData({ ...formData, locations: updatedLocations });
    };
    const removeLocation = (index) => {
        const updatedLocations = [...formData.locations].filter((_, locIndex) => locIndex !== index);
        setFormData({ ...formData, locations: updatedLocations });

        const newLocationErrors = { ...locationErrors };
        delete newLocationErrors[index];
        setLocationErrors(newLocationErrors);
    };


    const addLocation = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            locations: [...prevFormData.locations, { subcounty: '', ward: '' }]
        }));
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
     const  validateCurrentStep = () =>{
        const {isValid, errors} = validateFormStep(currentStep,formData)
        setFormErrors(errors)
        setFormValid(isValid)
        return isValid
    }
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
    const renderStep = () =>{
        switch(currentStep){
            case 1:
                return  <ProgramDetailsForm
                    handleInputChange={handleInputChange}
                    formData={formData}
                    handleValidationStateChange={handleValidationStateChange}
                    requiredValidator={requiredValidator}
                    numberValidator={numberValidator}
                    formErrors={formErrors}
                    programs={programs}

                />
            case 2 :
                return <Certandloc
                    caption ="Program Location"
                    formData={formData}
                    handleCertificateItemChange={handleCertificateItemChange}
                    validateCertificateData={validateCertificateData}
                    removeCertificateItem={removeCertificateItem}
                    addCertificateItem={addCertificateItem}
                    addLocation={addLocation}
                    validateLocation={validateLocation}
                    handleLocationChange={handleLocationChange}
                    locationErrors={locationErrors}
                    wards={wards}
                    removeLocation={removeLocation}
                    subCountyWards={subCountyWards}
                />
            default :
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
