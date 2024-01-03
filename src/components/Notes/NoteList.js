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
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        fetch(`${config.backendURL}/notes`,{
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

    const [openNoteIndex, setOpenNoteIndex] = useState(null);

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
                    <div key={note.id}> 
                        <Button
                            color="link"
                            onClick={() => toggleDetails(index)}
                            style={{ marginBottom: '1rem', textDecoration: 'none' }}
                        >
                            {note.subject} 
                        </Button>
                        <Collapse isOpen={openNoteIndex === index}>
                            <Card>
                                <CardBody>
                                    {note.body} 
                                    <br />
                                    <small>{new Date(note.timestamp).toLocaleString()}</small>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                ))}
            </CardBody>
        </Card>
    );
};
