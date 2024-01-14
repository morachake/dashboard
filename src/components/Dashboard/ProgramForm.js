import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { Form, Button, Card, CardBody } from 'reactstrap';

import config from 'config';
import { ProjectDetailsForm } from './InputForm/ProjectdetailsForm';
import { Certandloc } from './InputForm/Certand loc';
import { validateFormStep } from './InputForm/formValidator';
import CustomModal from 'components/Reusable/CustomModal';
import { ProgramDetailsForm } from './InputForm/ProgramDetailsForm';


const subCountyWards = {
    Mvita: ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
    Likoni: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
    Changamwe: ["Port Reitz", "Kipevu", "Airport", "Miritini", "Chaani"],
    Kisauni: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
    Nyali: ["Frere Town", "Ziwa la Ng’ombe", "Mkomani", "Kongowea", "Kadzandani"],
    Jomvu: ["Jomvu Kuu", "Magongo", "Mikindini"]
};
const initialFormData = {
    project_name: '',
    description: '',
    contractor_details: '',
    status: '',
    project_status_percentage: '',
    remarks: '',
    start_date: '',
    end_date: '',
    contract_sum: '',
    certificates: [],
    recommendations: '',
    locations: [],
    before_images_url: '',
    after_images_url: '',
};

export default function ProgramForm() {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const { user } = useAuth();
    const [wards, setWards] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState({title:"",message:"",type:""});
    const [formErrors, setFormErrors] = useState({});
    const [locationErrors, setLocationErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        ...initialFormData,
        user_id: user.id
    });
    const [formValid, setFormValid] = useState({});
    // const [updatedLocations ,setUpdatedLocations] = useState([])
    const  validateCurrentStep = () =>{
        const {isValid, errors} = validateFormStep(currentStep,formData)
        setFormErrors(errors)
        setFormValid(isValid)
        return isValid
    }

    // const handleLocationChange = (index, key, value) => {
    //     const updatedLocations = [...formData.locations];
    //     if (key === 'subcounty') {
    //         updatedLocations[index] = { subcounty: value, ward: '' }; // Reset ward when subcounty changes
    //         setWards(subCountyWards[value] || []); // Update wards for the UI
    //     } else {
    //         updatedLocations[index][key] = value;
    //     }
    //     setFormData({ ...formData, locations: updatedLocations });
    // };
// 
    // const handleLocationChange = (index,key,value) => {
    //     let updatedLocations = [...formData.locations];
    //     if(key === 'subcounty'){
    //         if(value === 'all'){
    //             updatedLocations = Object.entries(subCountyWards).flatMap(([subcounty,wards]) =>
    //                 wards.map(ward => ({subcounty, ward}))
    //             )
    //         } else {
    //             updatedLocations[index] ={subcounty: value , ward: ''}
    //             setWards(subCountyWards[value] || []);
    //         }
    //     } else {
    //         updatedLocations[index][key] = value;
    //     }
    //     setFormData({...formData , locations:updatedLocations});
    // }
    const handleLocationChange = (index, key, value) => {
    let updatedLocations = [...formData.locations];

    if (key === 'subcounty') {
        // Case: 'All Subcounties' selected
        if (value === 'all') {
            updatedLocations = Object.entries(subCountyWards).flatMap(([subcounty, wards]) =>
                wards.map(ward => ({ subcounty, ward }))
            );
        } else {
            // Case: Specific subcounty selected, add all related wards
            const relatedWards = subCountyWards[value];
            updatedLocations.splice(index, 1, ...relatedWards.map(ward => ({ subcounty: value, ward })));
        }
    } else {
        updatedLocations[index][key] = value;
    }
    setFormData({ ...formData, locations: updatedLocations });
};


    const validateLocation = (index, subcounty, ward) => {
        const newLocationErrors = { ...locationErrors };
        newLocationErrors[index] = {
            subcounty: subcounty ? '' : 'Subcounty is required',
            ward: ward ? '' : 'Ward is required',
        };

        setLocationErrors(newLocationErrors);
    };


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
        // console.log('Form data:', formData);
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
                console.log("Successfully submitted", data);
                 setModalContent({ title: 'Success', message: 'Form submitted successfully!', type: 'success' });
                setShowModal(true);
                clearForm()
            })
            .catch(err => {
                console.error("Error during submission:", err.message);
                setModalContent({ title: 'Success', message: 'An Eror Occure During submission ! Please try again', type: 'error' });
                setShowModal(true);
            })
            .finally(() => {setIsSubmitting(false)});
    };
    const clearForm = () => {
        setFormData({ ...initialFormData });
        // setSelectedSubCounty('');
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
 
    return (
        <Card >
           <CardBody>
            <CustomModal 
                title={modalContent.title}
                message={modalContent.message}
                type={modalContent.type}
                
            />
             <ProgramDetailsForm
                    handleInputChange={handleInputChange}
                    formData={formData}
                    handleValidationStateChange={handleValidationStateChange}
                    requiredValidator={requiredValidator}
                    numberValidator={numberValidator}
                    formErrors={formErrors}

                />
                <Form onSubmit={handleSubmit}>
                    <div className="form-navigation">                   
                            <Button type="submit" color='primary' disabled={!isFormValid() || isSubmitting}>
                                {isSubmitting ? "Submitting...." : "Submit"}
                            </Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    );
}
