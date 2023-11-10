

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Input, FormGroup, Label } from "reactstrap";

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleSelect">
                    Filter by sector
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                  >
                    <option>
                      Education
                    </option>
                    <option>
                      Trade
                    </option>
                    <option>
                      Finance
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                  <Label for="exampleSelect">
                    Filter by Location
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                  >
                    <option>
                      Likoni
                    </option>
                    <option>
                      Kisauni
                    </option>
                    <option>
                      Changamwe
                    </option>
                  </Input>
                </FormGroup>
              </Col>
             
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
