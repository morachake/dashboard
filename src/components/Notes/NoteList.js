import React, { useState } from 'react';
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
    const notes = [
        {
            subject: "I need an update on the jomvu project",
            details: "You can create a list of notes where the subject is clickable and expands to show more details using React's state and the Collapse component from Reactstrap. Below is an example of how you might implement this. Each note will be represented by a state object containing its subject and details, and the visibility of its details will be controlled by the state as well."
        },
        {
            subject: "We need a clean bill of notes",
            details: "You can create a list of notes where the subject is clickable and expands to show more details using React's state and the Collapse component from Reactstrap. Below is an example of how you might implement this. Each note will be represented by a state object containing its subject and details, and the visibility of its details will be controlled by the state as well."
        },
        {
            subject: "Update on tax collection changes",
             details: "You can create a list of notes where the subject is clickable and expands to show more details using React's state and the Collapse component from Reactstrap. Below is an example of how you might implement this. Each note will be represented by a state object containing its subject and details, and the visibility of its details will be controlled by the state as well."
        },
        {
            subject: "Call my office todays you",
             details: "You can create a list of notes where the subject is clickable and expands to show more details using React's state and the Collapse component from Reactstrap. Below is an example of how you might implement this. Each note will be represented by a state object containing its subject and details, and the visibility of its details will be controlled by the state as well."
        },
        {
            subject: "Please contact me before theend of the week with all updates required",
             details: "You can create a list of notes where the subject is clickable and expands to show more details using React's state and the Collapse component from Reactstrap. Below is an example of how you might implement this. Each note will be represented by a state object containing its subject and details, and the visibility of its details will be controlled by the state as well."
        },
    ];
    const [openNoteIndex, setOpenNoteIndex] = useState(null);

    const toggleDetails = (index) => {
        if (openNoteIndex === index) { // If the clicked note is already open, close it
            setOpenNoteIndex(null);
        } else {
            setOpenNoteIndex(index); // Else, open the clicked note
        }
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
                    <div key={index}>
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
                                    {note.details}
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                ))}
            </CardBody>
        </Card>
    );
};


