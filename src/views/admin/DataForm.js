
import InputForm from 'components/Dashboard/InputForms';
import UserHeader from 'components/Headers/UserHeader';
import React from 'react';
import { Col, Container, Row,  } from 'reactstrap';

export default function DataForm() {
    return (
        <>
             <UserHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                       <InputForm/>
                    </Col>
                    <Col xl="4">
                      
                    </Col>
                </Row>
            </Container>
        </>
    );
}
