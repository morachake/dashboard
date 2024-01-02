import config from 'config';
import React, { useEffect, useState } from 'react';
import {
    Card, CardHeader, CardBody, FormGroup, Label, Button, Alert, CustomInput,Input
} from 'reactstrap';

export default function NoteTaker() {
    const [assignedTo, setAssignedTo] = useState([]);
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState({});
    const [department, setDepartment] = useState([]);
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() =>{
         fetchCecs();
    },[])

    const handleDepartmentToggle = (deptId) => {
        if (assignedTo.includes(deptId)) {
            setAssignedTo(assignedTo.filter(d => d !== deptId));
        } else {
            setAssignedTo([...assignedTo, deptId]);
        }
    };

    const fetchCecs = () =>{
        fetch(`${config.backendURL}/cecs`,{
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setDepartment(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
   
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
                'Authorization': `Bearer ${accessToken}`
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
                        {department.map((dept, index) => (
                            <CustomInput
                                key={dept.id}
                                type="checkbox"
                                id={`department-${dept.id}`}
                                label={dept.role}
                                onChange={() => handleDepartmentToggle(dept.id)}
                                checked={assignedTo.includes(dept.id)}
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
