import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { Form, FormGroup, FormText, Input, Label, Button, CardHeader } from 'reactstrap';

const subCountyWards = {
    Mvita: ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
    Likoni: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
    Changamwe: ["Port Reitz", "Kipevu", "Airport", "Miritini", "Chaani"],
    Kisauni: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
    Nyali: ["Frere Town", "Ziwa la Ng’ombe", "Mkomani", "Kongowea", "Kadzandani"],
    Jomvu: ["Jomvu Kuu", "Magongo", "Mikindini"]
};

export default function InputForm() {
    const { user } = useAuth();
    const [selectedSubCounty, setSelectedSubCounty] = useState('');
    const [wards, setWards] = useState([]);
    const [fileData, setFileData] = useState({
        before_images : null,
        after_images : null
    })
    const [formData, setFormData] = useState({
        project_name: '',
        subcounty: '',
        ward: '',
        description: '',
        contract_sum: '',
        time_frame: '',
        contractor_details: '',
        status: '',
        remarks: '',
        recommendations: '',
        // Images will be handled separately since they are files
    });

    const handleSubCountyChange = (event) => {
        const subCounty = event.target.value;
        setSelectedSubCounty(subCounty);
        setWards(subCountyWards[subCounty] || []);
        setFormData({ ...formData, subcounty: subCounty });
    };

    const handleWardChange = (event) => {
        setFormData({ ...formData, ward: event.target.value });
    };

    const handleInputChange = (event) => {
        const { name, type, files, value } = event.target;
        if (type !== 'file') {
            setFormData({ ...formData, [name]: value });
        } else {
            // Store the File object directly
            setFileData({ ...fileData, [name]: files[0] });  // Assuming single file upload
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        saveData();
    };

    const saveData = () => {
        const postData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            postData.append(key, value);
        });
    
        // Append file data to the FormData if files are present
        if (fileData.before_images) {
            postData.append('before_images', fileData.before_images);
        }
        if (fileData.after_images) {
            postData.append('after_images', fileData.after_images);
        }
    
        // Remove content-type header so that browser sets it with the boundary
        fetch('http://127.0.0.1:5000/forms', {
            method: 'POST',
            body: postData  // No headers field, let the browser set the Content-Type
        })
        .then(response => response.json())
        .then(data => {
            console.log("Successfully submitted", data);
            // Handle success
        })
        .catch(err => {
            console.error("Error during submission:", err.message);
            // Handle errors
        });
    };
    
    
    

    return (
        <CardHeader>
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
                </FormGroup>
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

                <FormGroup>
                    <Label for="exampleText">
                        Project Description
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        type="textarea"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="contractSum">
                        Contract Sum
                    </Label>
                    <Input
                        id="contractSum"
                        name="contract_sum"
                        placeholder="Enter the contract sum"
                        type="number"
                        value={formData.contract_sum}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="timeFrame">
                        Time Frame
                    </Label>
                    <Input
                        id="timeFrame"
                        name="time_frame"
                        placeholder="Enter the project time frame"
                        type="text"
                        value={formData.time_frame}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="contractorDetails">
                        Contractor Details
                    </Label>
                    <Input
                        id="contractorDetails"
                        name="contractor_details"
                        placeholder="Enter the contractor's details"
                        type="text"
                        value={formData.contractor_details}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                {/* ... Add other input fields as needed ... */}
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
                {/* Assuming before_images and after_images are file uploads */}
                <FormGroup>
                    <Label for="beforeImages">Previous Images</Label>
                    <Input
                        id="beforeImages"
                        name="before_images"
                        type="file"
                        onChange={handleInputChange}
                        multiple
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="afterImages">Current Image</Label>
                    <Input
                        id="afterImages"
                        name="after_images"
                        type="file"
                        onChange={handleInputChange}
                        multiple
                    />
                </FormGroup>

                <Button type="submit" >
                    Submit
                </Button>
            </Form>
        </CardHeader>
    );
}
