import UserHeader from 'components/Headers/UserHeader';
import NoteTaker from 'components/Notes/Notetaker';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
  } from 'reactstrap';

export default function Notes() {
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
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            Previous Notes
                                        </h6>

                                    </div>
                                    <div className="col">
                                                                               
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div className="chart">

                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4">
                       <NoteTaker/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
