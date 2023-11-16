
import { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import "./admidbar.css"
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Modal,
  Media,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useAuth } from "context/AuthContext";

const AdminNavbar = (props) => {


  const [modal, setModal] = useState(false);
  const [governorModal, setGovernorModal] = useState(false);
  const {logout,user} = useAuth()
  console.log(user);
  const toggle = () => setModal(!modal);
  const openModal = () => setGovernorModal(!governorModal)
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {/* {props.brandText} */}
            <h6 style={{ fontSize: '0.9em', color: '#FFFF' }}> Mombasa county service delivery unit</h6>
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            {/* message modal */}
            <Button onClick={openModal} >
              Governors Notes
            </Button>
            <Button onClick={toggle} >
              Notifications
            </Button>

            <Modal isOpen={modal} toggle={toggle} className="notification-modal">
              <ModalHeader toggle={toggle}>Notifications</ModalHeader>
              <ModalBody>
                {/* Here you can map through your notifications and display them */}
                <div className="notification-item">
                  Project updated successfully
                </div>
                <div className="notification-item">
                  Jomvu road update...
                </div>
                <div className="notification-item">
                  Lokoni subcount water project ...
                </div>
                <div className="notification-item">
                  New CES added ..
                </div>
                {/* Add more items here */}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
            {/* end of message modal */}
            {/* governors notes complete */}
            <Modal isOpen={governorModal} >
              <ModalHeader >Notes</ModalHeader>
              <ModalBody>
                <ul>
                  <li>1: Update from Transport Sector</li>
                  <li>2: Schedule appointment with the finance department</li>
                  <li>3: Draft the report for the upcoming project</li>
                  
                </ul>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <FormGroup className="w-100">
                    <Input
                      id="exampleText"
                      name="text"
                      type="textarea"
                      placeholder="Type your note here..."
                      className="w-100"
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary">
                  Add Note
                </Button>
                <Button color="secondary" onClick={openModal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>

            {/* end  */}
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">

                  <span className="ml-3 avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src="https://web.mombasa.go.ke/wp-content/uploads/elementor/thumbs/msa-county-pvpwt97u9pzd6lh7rs4eyuajx9c5n3tbhn01h7rg14.png"
                    />
                  </span>

                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome! {user?.username}</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile </span>
                </DropdownItem>
                <DropdownItem >
                  <i className="ni ni-notification-70" />
                  <span>Notifications </span>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
