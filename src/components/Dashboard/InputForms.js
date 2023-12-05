import { useAuth } from 'context/AuthContext';
import React, { useCallback, useState } from 'react';
import { Form, FormGroup, FormText, Input, Label, Button, CardHeader, Row, CardBody, Col } from 'reactstrap';
import ImageUpload from "../Reusable/ImageUpload";
import ValidatedInput from 'components/Reusable/ValidatedInput';

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
        if (canSubmit()) {
            saveData();
        } else {
            console.error('Form validation failed');
            // Optionally, display an error message in the UI
        }
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

        fetch('http://127.0.0.1:5000/form', {
            method: 'POST',
            body: JSON.stringify(jsonPayload),
            headers: {
                'Content-Type': 'application/json'
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
        setFormData({ ...initialFormData, user_id: user.id });
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
        for (let certificate of formData.certificates) {
            if (Object.keys(validateCertificateData(certificate)).length > 0) {
                return false;
            }
        }
        return true;
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
    const requiredValidator = (value) => value ? '' : 'This field is required';

    return (
        <CardHeader>
            <CardBody>
            </CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">
                        Project Name
                    </Label>
                    <Input
                        id="project_name"
                        name="project_name"
                        placeholder="Project Name"
                        type="text"
                        value={formData.project_name}
                        onChange={handleInputChange}
                    />
                     {formErrors.project_name && <div className="text-danger">{formErrors.project_name}</div>}
                </FormGroup>

                <Row lg={4} md={6} xs={12}>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="subCountySelect">Sub-County</Label>
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
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="wardsSelect">Wards</Label>
                            <Input
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
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="status">
                                Status
                            </Label>
                            <Input
                                id="status"
                                name="status"
                                placeholder="Enter the project status"
                                type="text"
                                value={formData.status}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
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
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="contractor_details">
                                Contractor Details
                            </Label>
                            <Input
                                id="contractor_details"
                                name="contractor_details"
                                placeholder="Enter the contractor's details"
                                type="text"
                                value={formData.contractor_details}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="contract_sum">
                                Contract Sum
                            </Label>
                            <Input
                                id="contract_sum"
                                name="contract_sum"
                                placeholder="Enter the contract sum"
                                type="number"
                                value={formData.contract_sum}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="time_frame">
                                Time Frame
                            </Label>
                            <Input
                                id="time_frame"
                                name="time_frame"
                                placeholder="Enter the project time frame"
                                type="text"
                                value={formData.time_frame}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>

                </Row>



                <FormGroup>
                    <Label for="certificates">Certificates</Label>
                    {formData.certificates.map((certificate, index) => (
                        <div key={index}>
                            <Row lg={4} md={6} xs={12}>
                                <Col md={6} lg={4}>
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
                                <Col md={6} lg={4}>
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
                                <Col>
                                    <Button type="button" onClick={() => removeCertificateItem(index)}>
                                        Remove Certificate
                                    </Button>
                                </Col>

                            )}
                        </div>
                    ))}
                    <Col>
                        <Button type="button" onClick={addCertificateItem}>
                            Add Certificate
                        </Button>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Label for="remarks">
                        Remarks
                    </Label>
                    <Input
                        id="remarks"
                        name="remarks"
                        placeholder="Enter any remarks"
                        type="textarea"
                        value={formData.remarks}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="recommendations">
                        Recommendations
                    </Label>
                    <Input
                        id="recommendations"
                        name="recommendations"
                        placeholder="Enter any recommendations"
                        type="textarea"
                        value={formData.recommendations}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <Row lg={4} md={6} xs={12}>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="before_images_url">Previous Images</Label>
                            <ImageUpload onImageUpload={(url) => handleImageUpload(url, 'before_images_url')} />
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label for="after_images_url">Current Image</Label>
                            <ImageUpload onImageUpload={(url) => handleImageUpload(url, 'after_images_url')} />
                        </FormGroup>
                    </Col>
                </Row>

                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </CardHeader>
    );
}
