
import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import {cabinetRoutes} from "../routes/routes";

const CabinetLayout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/cabinet") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < cabinetRoutes.length; i++) {
      if (
        props?.location?.pathname.indexOf(cabinetRoutes[i].layout + cabinetRoutes[i].path) !==
        -1
      ) {
        return cabinetRoutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={cabinetRoutes}
        logo={{
          imgSrc: ("https://web.mombasa.go.ke/wp-content/uploads/elementor/thumbs/msa-county-pvpwt97u9pzd6lh7rs4eyuajx9c5n3tbhn01h7rg14.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(cabinetRoutes)}
          <Route path="*" element={<Navigate to="/cabinet/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default CabinetLayout;
