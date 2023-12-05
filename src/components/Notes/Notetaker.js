import config from 'config';
import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, FormGroup, Label, Button, Alert, CustomInput,Input
} from 'reactstrap';

export default function NoteTaker({}) {
    const [assignedTo, setAssignedTo] = useState([]);
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState({});

    const handleDepartmentToggle = (dept) => {
        if (assignedTo.includes(dept)) {
            setAssignedTo(assignedTo.filter(d => d !== dept));
        } else {
            setAssignedTo([...assignedTo, dept]);
        }
    };
    
    const handleSubjectChange = (e) => setSubject(e.target.value);
    const handleDetailsChange = (e) => setDetails(e.target.value);

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!subject.trim()) {
            newErrors.subject = 'Subject is required';
            isValid = false;
        }

        if (!details.trim()) {
            newErrors.details = 'Details are required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const createNote = () => {
        if (!validateForm()) {
            return;
        }

        const noteData = {
            assignedTo: assignedTo,
            body: details,
            subject: subject
        };

        fetch(`${config.backendURL}/note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setAssignedTo([]); 
            setDetails(''); 
            setSubject(''); 
            setErrors({}); 
            // if (onNoteCreated) {
            //     onNoteCreated();
            // }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const departments = [
        "Health",
        "Water, Natural Resources & Climate",
        "PSA, Youth, Gender, Social Services & Sports",
        "Blue Economy, Agriculture & Livestock",
        "Education & Digital Transformation",
        "Tourism, Culture & Trade",
        "Transport & Infrastructure",
        "Lands, Housing & Urban Planning"
    ];

    return (
        <Card className="shadow">
            <CardHeader className="bg-transparent">
                <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Add New Note
                </h6>
            </CardHeader>
            <CardBody>
                <FormGroup>
                    <Label>Assigned To (optional)</Label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {departments.map((dept, index) => (
                            <CustomInput
                                key={index}
                                type="checkbox"
                                id={`department-${index}`}
                                label={dept}
                                onChange={() => handleDepartmentToggle(dept)}
                                checked={assignedTo.includes(dept)}
                            />
                        ))}
                    </div>
                </FormGroup>
                {errors.subject && <Alert color="danger">{errors.subject}</Alert>}
                <FormGroup>
                    <Label for="noteSubject">Subject</Label>
                    <Input
                        type="text"
                        id="noteSubject"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={handleSubjectChange}
                        invalid={!!errors.subject}
                    />
                </FormGroup>
                {errors.details && <Alert color="danger">{errors.details}</Alert>}
                <FormGroup>
                    <Label for="noteDetails">Details</Label>
                    <Input
                        type="textarea"
                        id="noteDetails"
                        placeholder="Enter details"
                        style={{ height: '200px' }}
                        value={details}
                        onChange={handleDetailsChange}
                        invalid={!!errors.details}
                    />
                </FormGroup>
                <Button color="primary" onClick={createNote}>Add Note</Button>
            </CardBody>
        </Card>
    );
}
