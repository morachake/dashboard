import React from 'react';
import UserHeader from 'components/Headers/UserHeader';
import NoteList from 'components/Notes/NoteList';
import {
    Col,
    Container,
  } from 'reactstrap';

export default function ExcNotes() {
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
