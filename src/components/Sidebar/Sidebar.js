
/*eslint-disable*/
import { useState ,useEffect} from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  Badge,
  NavItem,
  NavLink,
  Nav, 
  Container,
  Row,
  Col,
} from "reactstrap";
import { useAuth } from "context/AuthContext";
import NotificationModal from "components/Navbars/NotificationModal";
import config from "config";
import { Button } from "primereact/button";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const {user,logout} = useAuth()
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // verifies if routeName is the one active (in browser input)
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]')));
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
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
        // console.log(sortedData);
        setNotifications(sortedData);
      });
  }, []);
  const unreadCount = notifications.filter(notification => !readNotifications.has(notification.id)).length;

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src="https://web.mombasa.go.ke/wp-content/uploads/elementor/thumbs/msa-county-pvpwt97u9pzd6lh7rs4eyuajx9c5n3tbhn01h7rg14.png"
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <Button className="rounded" onClick={toggle}>
              <i className="ni ni-bell-55" />
                {unreadCount > 0 && (
                <Badge color="danger" className="notification-badge">
                  {unreadCount}
                </Badge>
              )}
          </Button>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>{createLinks(routes)}</Nav>  
             <Button style={{marginTop: 100 }} color="danger" onClick={logout}>  <i className="ni ni-user-run" />Logout</Button>
        </Collapse>
      <NotificationModal isOpen={modal} toggle={toggle} notifications={notifications} />

      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
