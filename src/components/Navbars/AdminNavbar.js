
import { useEffect, useState } from "react";
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
  Badge
} from "reactstrap";
import { useAuth } from "context/AuthContext";
import NotificationModal from "./NotificationModal";
import config from "config";


const AdminNavbar = (props) => {
  const [modal, setModal] = useState(false);
  const { logout, user } = useAuth()
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]')));
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    fetch(`${config.backendURL}/notifications`,{
      headers: { 'Authorization': `Bearer  ${accessToken}`}
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
       return response.json()
      })
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
         console.log(sortedData);
        setNotifications(sortedData);
      });
  }, []);
  const unreadCount = notifications.filter(notification => !readNotifications.has(notification.id)).length;

  const markNotificationsAsRead = () => {
    fetch(`${config.backendURL}/mark_notifications_read`,{
      method: 'POST',
      headers: {'Authorization': `Bearer ${accessToken }`}
    })
    .then(response => {
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      setReadNotifications(new Set(notifications.map(n => n.id)));
    })
    .catch( error => console.error("an error occure",error));
  };
 const toggle = () => {
    if(!modal){
      markNotificationsAsRead();
    }
    setModal(!modal)
  };
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
            <div onClick={toggle} style={{ cursor: 'pointer', position: 'relative' }}>
              <i className="ni ni-bell-55 custom-icon" />
              {unreadCount > 0 && (
                <Badge color="danger" className="notification-badge">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>
          <NotificationModal isOpen={modal} toggle={toggle} notifications={notifications} />
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">

                  <span className="ml-3 avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={`https://ui-avatars.com/api/?name=${user.username.charAt(0)}&background=random&color=fff&size=128`}
                    />
                  </span>

                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome! {user?.username}</h6>
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
