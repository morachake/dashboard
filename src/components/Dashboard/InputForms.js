import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { Form, Button, Card, CardBody } from 'reactstrap';

import config from 'config';
import { ProjectDetailsForm } from './InputForm/ProjectdetailsForm';
import { Certandloc } from './InputForm/Certand loc';


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

export default function InputForm() {
    const { user } = useAuth();
    const [selectedSubCounty, setSelectedSubCounty] = useState('');
    const [wards, setWards] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [locationErrors, setLocationErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        ...initialFormData,
        user_id: user.id
    });
    const [formValid, setFormValid] = useState({});
    // const [updatedLocations ,setUpdatedLocations] = useState([])

    const handleLocationChange = (index, key, value) => {
        const updatedLocations = [...formData.locations];
        if (key === 'subcounty') {
            updatedLocations[index] = { subcounty: value, ward: '' }; // Reset ward when subcounty changes
            setWards(subCountyWards[value] || []); // Update wards for the UI
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


    const handleImageUpload = (url, imageType) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [imageType]: url
        }));
    };

    const handleSubCountyChange = (event) => {
        const subCounty = event.target.value;
        setSelectedSubCounty(subCounty);
        setWards(subCountyWards[subCounty] || []);
        setFormData({ ...formData, subcounty: subCounty });
    };

    const handleWardChange = (event) => {
        setFormData({ ...formData, ward: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
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
        console.log('Form data:', formData);
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
                clearForm()
            })
            .catch(err => {
                console.error("Error during submission:", err.message);
            });
    };
    const clearForm = () => {
        setFormData({ ...initialFormData });
        setSelectedSubCounty('');
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
    const canSubmit = () => {
        let isValid = true;
        let newErrors = {};
        Object.keys(formData).forEach(key => {
            let error = '';
            switch (key) {
                case 'project_name':
                case 'description':
                case 'contractor_details':
                case 'status':
                case 'remarks':
                case 'recommendations':
                    error = requiredValidator(formData[key]);
                    break;
                case 'contract_sum':
                case 'time_frame':
                    error = numberValidator(formData[key]);
                    break;
                case 'certificates':
                    newErrors.certificates = formData.certificates.map(validateCertificateData);
                    if (newErrors.certificates.some(certError => Object.values(certError).some(e => e))) {
                        isValid = false;
                    }
                    return;
                default:
                    break;
            }
            newErrors[key] = error;
            if (error) isValid = false;
        });

        setFormErrors(newErrors);
        return isValid;
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
    const validateField = (name, value) => {
        if (!value) return 'This field is required';
        if (name === 'contract_sum' && isNaN(value)) return 'Must be a number';
        return '';
    };

    const validateForm = () => {
        let errors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'certificates') {
                errors[key] = validateField(key, formData[key]);
            } else {
                errors.certificates = formData.certificates.map(validateCertificate);
            }
        });
        setFormErrors(errors);
        return !Object.values(errors).some(error => error);
    };
    const validateCertificate = (certificate) => {
        let errors = {};
        if (!certificate.certificate_number) errors.certificate_number = 'Certificate number is required';
        if (!certificate.amount_certified || isNaN(parseFloat(certificate.amount_certified))) {
            errors.amount_certified = 'Valid amount certified is required';
        }
        return errors;
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
        if (currentStep < 2) { 
            setCurrentStep(currentStep + 1);
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
                />
            case 2:
                return <Certandloc
                    handleImageUpload={handleImageUpload}
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
                />
            default:
                return null
        }
    }
    return (
        <Card>
           <CardBody>
                <Form onSubmit={handleSubmit}>
                    {renderStep()}
                    <div className="form-navigation">
                        {currentStep > 1 && (
                            <Button onClick={prevStep} type='button' color='secondary'>Previous</Button>
                        )}
                        {currentStep < totalSteps && (
                            <Button onClick={nextStep} type='button' color='primary'>Next</Button>
                        )}
                        {currentStep === totalSteps && (
                            <Button type="submit" color='primary' disabled={!isFormValid()}>Submit</Button>
                        )}
                    </div>
                </Form>
            </CardBody>
        </Card>
    );
}
