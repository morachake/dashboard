import config from 'config';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    Collapse
} from 'reactstrap';

export default function NoteList() {
    const [notes, setNotes] = useState([]);
    const [roles, setRoles] = useState({});
    const [openNoteIndex, setOpenNoteIndex] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        // Fetching roles
        fetch(`${config.backendURL}/cecs`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })
        .then(response => response.json())
        .then(data => {
            const rolesMap = data.reduce((acc, role) => {
                acc[role.id] = role.role; // Assuming 'role' field has the department name
                return acc;
            }, {});
            setRoles(rolesMap);
        })
        .catch(error => console.error("An error occurred while fetching roles: ", error));

        // Fetching notes
        fetch(`${config.backendURL}/notes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })
        .then(response => response.json())  
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setNotes(sortedData);
        })
        .catch(error => console.error("An error occurred while fetching notes: ", error));
    }, []); 

    const toggleDetails = (index) => {
        setOpenNoteIndex(openNoteIndex === index ? null : index);
    };

    return (
        <Card className="shadow mt-3">
            <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                    <Col>
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                            Previous Notes
                        </h6>
                    </Col>
                </Row>
            </CardHeader>
           <CardBody>
                    {notes.map((note, index) => (
                        <div key={note.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}> 
                            <Button
                                color="link"
                                onClick={() => toggleDetails(index)}
                                style={{ textDecoration: 'none', padding: '0', marginBottom: '5px', fontSize: '1rem' }}
                            >
                                <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '1.2em' }}>
                                    {note.subject}
                                </span>
                                <small style={{ color: '#6c757d' }}>
                                    {new Date(note.timestamp).toLocaleString()}
                                </small>
                            </Button>
                            <Collapse isOpen={openNoteIndex === index}>
                                <Card>
                                    <CardBody style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
                                        <p style={{ whiteSpace: 'pre-wrap', margin: '0' }}>
                                            {note.body}
                                        </p>
                                        <hr />
                                        <p style={{ fontSize: '0.9em', color: '#6c757d', margin: '0' }}>
                                            Assigned to:
                                            {note.cec_ids.map((cec_id, idx) => (
                                                <span key={cec_id}>
                                                    {idx > 0 && ', '}
                                                    {roles[cec_id] || 'Unknown Department'}
                                                </span>
                                            ))}
                                        </p>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>
                    ))}
                </CardBody>

        </Card>
);
};