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
      <Col>
        <FormGroup>
          <Label for="countySelect">Filter by Time Frame</Label>
          <Input id="countySelect" name="select" type="select">
            <option value="">All time frames</option>
            <option value="county1">1 week</option>
            <option value="county2">2 weeks</option>
            {/* <!-- Additional dummy options as needed --> */}
          </Input>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label for="subcountySelect">Filter by Ward</Label>
          <Input id="subcountySelect" name="select" type="select">
            <option value="">All Wards</option>
            <option value="subcounty1">Ward 1</option>
            <option value="subcounty2">Ward 2</option>
            {/* <!-- Additional dummy options as needed --> */}
          </Input>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label for="villageSelect">Filter by Village</Label>
          <Input id="villageSelect" name="select" type="select">
            <option value="">All Villages</option>
            <option value="village1">Village 1</option>
            <option value="village2">Village 2</option>
            {/* <!-- Additional dummy options as needed --> */}
          </Input>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label for="departmentSelect">Filter by Budget</Label>
          <Input id="departmentSelect" name="select" type="select">
            <option value="">All Budgets</option>
            <option value="department1">Less than 1 Million</option>
            <option value="corporation1">Less than 5 Million</option>
            <option value="corporation1">Less than 20 Million</option>
            <option value="corporation1">Less than 50 Million</option>
            {/* <!-- Additional dummy options as needed --> */}
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
