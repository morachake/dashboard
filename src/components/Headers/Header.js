import React from 'react';
import { Container, Row, Col, Input, FormGroup, Label } from "reactstrap";

const Header = ({ onSectorChange, onLocationChange,onWardChange, sectors, locations,wards,onTypeChange }) => {


  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
             <Col md='4' sm="6" xs="12" >
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
                    <option value="">All Subcounties</option>
                    {Array.isArray(locations) && locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
             
              <Col>
                <FormGroup>
                  <Label for="wardSelect">
                    Filter by Ward
                  </Label>
                  <Input
                    id="wardSelect"
                    name="select"
                    type="select"
                    onChange={onWardChange}
                  >
                    <option value="">All Wards</option>
                    {Array.isArray(wards) && wards.map((ward, index) => (
                      <option key={index} value={ward}>{ward}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
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
            </Row>
              <Row>
             <Col md='12' sm="12" xs="12" >
                <FormGroup>
                  <Label for="locationSelect">
                    Filter by Type
                  </Label>
                  <Input
                    id="locationSelect"
                    name="select"
                    type="select"
                    onChange={onTypeChange}
                  >
                    <option value="">All</option>
                     <option value="project">Project</option>
                      <option value="program">Program</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="6" sm="6" xs="12">
                <FormGroup>
                  <Label for="sectorSelect">
                    Filter by Date
                  </Label>
                  <Input
                    id="sectorSelect"
                    name="select"
                    type="select"
                    onChange={onSectorChange}
                  >
                   
                  </Input>
                </FormGroup>
              </Col> */}
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
