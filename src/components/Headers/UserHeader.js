

// reactstrap components
import {  Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "200px",
          backgroundImage:
            "url(https://web.mombasa.go.ke/wp-content/uploads/elementor/thumbs/msa-county-pvpwt97u9pzd6lh7rs4eyuajx9c5n3tbhn01h7rg14.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
   
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
             
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
