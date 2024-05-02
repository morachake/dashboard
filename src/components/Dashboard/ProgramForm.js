import { useAuth } from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, CardBody } from 'reactstrap';

import config from 'config';
import { validateFormStep } from './InputForm/formValidator';
import Location from './InputForm/Location';
import { ProgramDetailsForm } from './InputForm/ProgramDetailsForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const subCountyWards = {
    Mvita: ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
    Likoni: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
    Changamwe: ["Port Reitz", "Kipevu", "Airport", "Changamwe", "Chaani"],
    Kisauni: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
    Nyali: ["Frere Town", "Ziwa la Ng’ombe", "Mkomani", "Kongowea", "Kadzandani"],
    Jomvu: ["Jomvu Kuu", "Miritini", "Mikindini"]
};


const initialFormData = {
    is_project: false,
    project_name: '',
    description: '',
    financier:'',
    status: '',
    project_status_percentage: '',
    remarks: '',
    start_date: '',
    end_date: '',
    certificates: [],
    recommendations: '',
    contract_sum: '',
    locations: [],
    milestones:'',
    program_id:'',
    contractor_details: 'ContractorDetails',
};

export default function ProgramForm() {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const { user } = useAuth();
    const [wards, setWards] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState({title:"",message:"",type:""});
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [programs,setPrograms] = useState([])
    const [locationErrors, setLocationErrors] = useState({});
    const [formData, setFormData] = useState({
        ...initialFormData,
        user_id: user.id
    });
    
    const [formValid, setFormValid] = useState({});
  
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
                setPrograms(data);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        fetchPrograms();
    }, []);
  

    const handleSubmit = (event) => {
        event.preventDefault();
        const {isFormValid,errors} = validateFormStep(1,formData)
        setFormErrors(errors)
        if (!isFormValid) {
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
               toast.success("Form ubmitted Successfully")
         
                clearForm()
            })
            .catch(err => {
                console.error("Error during submission:", err.message);
                toast.error("An Error occured while submitting,Please try again!")
               
            })
            .finally(() => {setIsSubmitting(false)});
    };
    const clearForm = () => {
        setFormData({ ...initialFormData });
        setWards([]);
    }

    const handleCertificateItemChange = (event, index) => {
        const { name, value } = event.target;
        const updatedCertificates = [...formData.certificates];
        updatedCertificates[index] = { ...updatedCertificates[index], [name]: value };
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
                <Form onSubmit={handleSubmit}>
                
                
                <ProgramDetailsForm
                    handleInputChange={handleInputChange}
                    formData={formData}
                    handleValidationStateChange={handleValidationStateChange}
                    requiredValidator={requiredValidator}
                    numberValidator={numberValidator}
                    formErrors={formErrors}
                    index={0}
                    programs={programs}
                    caption="Project payment Certificate"
                    handleCertificateItemChange={handleCertificateItemChange}
                    onLocationChange={handleLocationChange}
                    locationErrors={locationErrors}
                    wards={wards}
                    subCountyWards={subCountyWards}
                />         
                <Button type="submit" color='primary' disabled={!isFormValid() || isSubmitting}>
                    {isSubmitting ? "Submitting...." : "Submit"}
                </Button>
                </Form>
            </CardBody>
        </Card>
    );
}
