import UserHeader from 'components/Headers/UserHeader';
import NoteList from 'components/Notes/NoteList';
import NoteTaker from 'components/Notes/Notetaker';
import {

    Col,
    Container,
    Row,
  } from 'reactstrap';

export default function Notes() {   
    return (
        <>
            <UserHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <>
                         <NoteList/> 
                        </>
                    </Col>
                    <Col xl="4">
                    <NoteTaker  />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
