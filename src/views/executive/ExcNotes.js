import UserHeader from 'components/Headers/UserHeader';
import NoteList from 'components/Notes/NoteList';
import NoteTaker from 'components/Notes/Notetaker';
import React, { useState } from 'react';
import {
    Col,
    Container,
    Row,
  } from 'reactstrap';

export default function ExcNotes() {
    const [open, setopen] = useState('1')
    const toggle = (id) => {
        if (open === id) {
            setopen()
        } else {
            setopen(id)
        }
    }
    return (
        <>
            <UserHeader />
            <Container className="mt--7" fluid>
               
                <Col lg="6" md="8">
                      
                         <NoteList/> 
                        
                    </Col>
               
            </Container>
        </>
    );
}
