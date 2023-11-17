import React, { useState } from 'react';
import { 
  Card, CardHeader, CardBody, FormGroup, Input, Label, Button, Alert 
} from 'reactstrap';

export default function NoteTaker() {
    const [assignedTo, setAssignedTo] = useState('');
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState({});

    const handleAssignedToChange = (e) => setAssignedTo(e.currentTarget.textContent);
    const handleSubjectChange = (e) => setSubject(e.target.value);
    const handleDetailsChange = (e) => setDetails(e.target.value);

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!subject.trim()) {
            errors.subject = 'Subject is required';
            isValid = false;
        }

        if (!details.trim()) {
            errors.details = 'Details are required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const createNote = () => {
        if (!validateForm()) {
            return; // If the form is not valid, do not submit
        }

        const noteData = {
            body: details // The content of the note taken from the textarea
        };

        // Send the POST request to create a new note with only the 'body'
        fetch('http://127.0.0.1:5000/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setDetails(''); // Clear the textarea after successfully creating the note
            setSubject('');  // Clear the subject input after successfully creating the note
            setErrors({});   // Clear any errors
        })
        .catch((error) => {
            console.error('Error:', error);
            // Implement error handling logic here
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
};
