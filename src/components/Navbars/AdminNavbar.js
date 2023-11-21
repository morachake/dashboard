
import { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import "./admidbar.css"
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { useAuth } from "context/AuthContext";
import PropTypes from 'prop-types';
import NotificationModal from "./NotificationModal";

const AdminNavbar = (props) => {
  const { className } = props;
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);

  const toggle = () => setModal(!modal);

  const changeBackdrop = (e) => {
    let { value } = e.target;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    setBackdrop(value);
  };

  const changeKeyboard = (e) => {
    setKeyboard(e.currentTarget.checked);
  };
  const { logout, user } = useAuth()
  console.log(user);
  const handleNotification = () => { };
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            <h6 style={{ fontSize: '0.9em', color: '#FFFF' }}> Mombasa county service delivery unit</h6>
          </Link>
          <div className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div onClick={toggle} style={{ cursor: 'pointer' }}>
              <i className="ni ni-bell-55 custom-icon" />
            </div>
          </div>
          <NotificationModal isOpen={modal} toggle={toggle}/>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">

                  <span className="ml-3 avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src="https://mwanasiasa.com/wp-content/uploads/2022/02/Abdulswamad-Shariff-Nassir.jpg"
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
