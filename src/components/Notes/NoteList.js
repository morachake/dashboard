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
        fetch('http://127.0.0.1:5000/notes')
        .then(response => response.json()) // Corrected: json is a method, so it needs to be called with ()
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setNotes(sortedData);
        })
        .catch(error => console.error("An error occurred while fetching notes: ", error));
    }, []); // Added dependency array to prevent this effect from running on every render

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
                    <div key={note.id}> {/* Changed key to note.id to ensure uniqueness */}
                        <Button
                            color="link"
                            onClick={() => toggleDetails(index)}
                            style={{ marginBottom: '1rem', textDecoration: 'none' }}
                        >
                            {note.body} {/* Assuming the subject is in the 'body' field */}
                        </Button>
                        <Collapse isOpen={openNoteIndex === index}>
                            <Card>
                                <CardBody>
                                    {note.body} {/* Assuming the details are in the 'body' field */}
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
