import { useAuth } from 'context/AuthContext';
import React, { useCallback, useState } from 'react';
import { Card ,Form, FormGroup, FormFeedback, Input, Label, Button, CardHeader, Row, CardBody, Col } from 'reactstrap';
import ImageUpload from "../Reusable/ImageUpload";
import ValidatedInput from 'components/Reusable/ValidatedInput';
import config from 'config';

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
    subcounty: '',
    ward: '',
    description: '',
    contract_sum: '',
    time_frame: '',
    contractor_details: '',
    certificates: [],
    status: '',
    remarks: '',
    start_date:'',
    end_date:'',
    recommendations: '',
    before_images_url: '',
    after_images_url: '',
};

export default function InputForm() {
    const { user } = useAuth();
    const [selectedSubCounty, setSelectedSubCounty] = useState('');
    const [wards, setWards] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        ...initialFormData,
        user_id: user.id
    });
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
        // if (canSubmit()) {
            saveData();
        // } else {
            // console.error('Form validation failed');
            // console.log('Form data:', formData); // Log the form data
            // console.log('Form errors:', formErrors); // Log the form errors
            // Optionally, display an error message in the UI
        // }
    };
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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

        // Validate each field in formData
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


    return (
        <CardHeader>
            <CardBody>
            </CardBody>
            <Form onSubmit={handleSubmit}>
                <ValidatedInput
                    label="Project Name"
                    id="project_name"
                    name="project_name"
                    placeholder="Project Name"
                    type="text"
                    value={formData.project_name}
                    onChange={handleInputChange}
                    validator={requiredValidator}
                />
                <Row lg={4} md={6} xs={12}>
                    <Col md={6} lg={4}>
                        <Label>
                            Select Sub-County
                        </Label>
                        <Input

                            id="subCountySelect"
                            name="subcounty"
                            type="select"
                            onChange={handleSubCountyChange}
                            value={selectedSubCounty}
                        >
                            <option value="">Select Sub-County</option>
                            <option value="Mvita">Mvita</option>
                            <option value="Likoni">Likoni</option>
                            <option value="Changamwe">Changamwe</option>
                            <option value="Kisauni">Kisauni</option>
                            <option value="Nyali">Nyali</option>
                            <option value="Jomvu">Jomvu</option>
                        </Input>
                        <FormFeedback>{formErrors.subcounty}</FormFeedback>
                    </Col>
                    <Col md={6} lg={4}>
                        <Label>Select Ward</Label>
                        <Input
                            label="Wards"
                            id="wardsSelect"
                            name="ward"
                            type="select"
                            onChange={handleWardChange}
                            value={wards.length === 0 ? '' : undefined}
                        >
                            {wards.length === 0 ? (
                                <option>No wards available</option>
                            ) : (
                                wards.map((ward, index) => (
                                    <option key={index} value={ward}>
                                        {ward}
                                    </option>
                                ))
                            )}
                        </Input>
                        <FormFeedback>{formErrors.ward}</FormFeedback>
                    </Col>
                    <Col md={6} lg={4}>
                        <ValidatedInput
                            label="Status"
                            id="status"
                            name="status"
                            placeholder="Enter the project status"
                            type="text"
                            value={formData.status}
                            onChange={handleInputChange}
                            validator={requiredValidator}
                        />

                    </Col>
                </Row>

                <ValidatedInput
                    label="Project Description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                    validator={requiredValidator}
                />

                <Row lg={4} md={6} xs={12}>
                    <Col md={6} lg={6}>
                            <ValidatedInput
                                label="Start Date"
                                name="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                validator={requiredValidator}
                            />
                    </Col>
                    <Col md={6} lg={6}>
                       <ValidatedInput
                                label="End Date"
                                name="end_date"
                                type="date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                                validator={requiredValidator}
                            />
                    </Col>
                </Row>
                <Row lg={4} md={6} xs={12}>
                    <Col md={6} lg={6}>

                        <ValidatedInput
                            id="contractor_details"
                            name="contractor_details"
                            label="Contractor Details"
                            type="text"
                            value={formData.contractor_details}
                            onChange={handleInputChange}
                            validator={requiredValidator}
                        />
                    </Col>
                    <Col md={6} lg={6}>
                        <ValidatedInput
                            label="Contract Sum"
                            id="contract_sum"
                            name="contract_sum"
                            placeholder="Enter the contract sum"
                            type="number"
                            value={formData.contract_sum}
                            onChange={handleInputChange}
                            validator={numberValidator}
                        />
                    </Col>
                    {/* <Col md={6} lg={4}>
                        <ValidatedInput
                            label="Time Frame"
                            id="time_frame"
                            name="time_frame"
                            placeholder="Enter the project time frame"
                            type="text"
                            value={formData.time_frame}
                            onChange={handleInputChange}
                            validator={numberValidator}
                        />
                    </Col> */}

                </Row>



                <FormGroup>
                    <Label for="certificates">Certificates</Label>
                    {formData.certificates.map((certificate, index) => (
                        <div key={index}>
                            <Row lg={4} md={6} xs={12}>
                                <Col md={6} lg={6}>
                                    <FormGroup>
                                        <Label for={`certificateNumber-${index}`}>Certificate Number</Label>
                                        <Input
                                            id={`certificateNumber-${index}`}
                                            name="certificate_number"
                                            placeholder="Certificate Number"
                                            type="text"
                                            value={certificate.certificate_number}
                                            onChange={(e) => handleCertificateItemChange(e, index)}
                                        />
                                        {/* Display validation error if any */}
                                        {validateCertificateData(certificate).certificate_number && (
                                            <div className="text-danger">
                                                {validateCertificateData(certificate).certificate_number}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md={6} lg={6}>
                                    <FormGroup>
                                        <Label for={`amountCertified-${index}`}>Amount Certified</Label>
                                        <Input
                                            id={`amountCertified-${index}`}
                                            name="amount_certified"
                                            placeholder="Amount Certified"
                                            type="text"
                                            value={certificate.amount_certified}
                                            onChange={(e) => handleCertificateItemChange(e, index)}
                                        />
                                        {/* Display validation error if any */}
                                        {validateCertificateData(certificate).amount_certified && (
                                            <div className="text-danger">
                                                {validateCertificateData(certificate).amount_certified}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            {index > 0 && (
                                <Col className='m-4 '>
                                    <Button type="button" onClick={() => removeCertificateItem(index)}>
                                        Remove Certificate
                                    </Button>
                                </Col>

                            )}
                        </div>
                    ))}
                    <Col className=''>
                        <Button type="button" onClick={addCertificateItem}>
                            Add Certificate
                        </Button>
                    </Col>
                </FormGroup>

                <FormGroup>

                    <ValidatedInput
                        label="Remarks"
                        id="remarks"
                        name="remarks"
                        placeholder="Enter any remarks"
                        type="textarea"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        validator={requiredValidator}
                    />
                </FormGroup>

                <FormGroup>

                    <ValidatedInput
                        label="Recommendations"
                        id="recommendations"
                        name="recommendations"
                        placeholder="Enter any recommendations"
                        type="textarea"
                        value={formData.recommendations}
                        onChange={handleInputChange}
                        validator={requiredValidator}
                    />
                </FormGroup>

                <Row lg={4} md={6} xs={12}>
                    <Col md={6} lg={6}>
                        
                            <Label for="before_images_url">Previous Images</Label>
                            <ImageUpload onImageUpload={(url) => handleImageUpload(url, 'before_images_url')} />
                        
                    </Col>
                    <Col md={6} lg={6}>
                    
                            <Label for="after_images_url">Current Image</Label>
                            <ImageUpload onImageUpload={(url) => handleImageUpload(url, 'after_images_url')} />
                    
                    </Col>
                </Row>

                <Card>
                <Button type="submit" color='primary'>
                    Submit
                </Button>
                    
                </Card>
            </Form>
        </CardHeader>
    );
}
