import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { Form, Button, Card, CardBody } from 'reactstrap';
import config from 'config';
import { ProgramDetailsForm } from './InputForm/ProgramDetailsForm';


const initialFormData ={ 
    project_name: '',
    description: '',
    contract_sum: '',
    contract_sum_usd:'',
    contractor_details: '',
    status: '',
    project_status_percentage: '',
    financier: '',
    start_date: '',
    end_date: '',
    milestone: '',
};

export default function ProgramForm() {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const { user } = useAuth();
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        ...initialFormData,
        user_id: user.id
    });
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
                clearForm()
            })
            .catch(err => {
                console.error("Error during submission:", err.message);   
            })
            .finally(() => {setIsSubmitting(false)});
    };
    const clearForm = () => {
        setFormData({ ...initialFormData });
    }
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
