import React from 'react';
// reactstrap components
import { Container, Row, Col, Input, FormGroup, Label } from "reactstrap";

const Header = ({ onSectorChange, onLocationChange, sectors, locations }) => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col>
                <FormGroup>
                  <Label for="sectorSelect">
                    Filter by sector
                  </Label>
                  <Input
                    id="sectorSelect"
                    name="select"
                    type="select"
                    onChange={onSectorChange}
                  >
                    <option value="">All Sectors</option>
                    {Array.isArray(sectors) && sectors.map((sector, index) => (
                      <option key={index} value={sector}>{sector}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="locationSelect">
                    Filter by Subcounty
                  </Label>
                  <Input
                    id="locationSelect"
                    name="select"
                    type="select"
                    onChange={onLocationChange}
                  >
                    <option value="">All Locations</option>
                    {Array.isArray(locations) && locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
