import React, { useEffect, useState } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Card, CardHeader, CardBody, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import { chartOptions, parseOptions } from "variables/charts.js";
import Header from "components/Headers/Header.js";
import ProjectsTable from "components/Dashboard/ProjectsTable";
import BudgetBars from "components/Dashboard/BudgetBars";

const Index = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [projects, setProjects] = useState([]); // State for all projects
  const [filteredProjects, setFilteredProjects] = useState([]); // State for filtered projects
  const [sectorFilter, setSectorFilter] = useState('');
const [locationFilter, setLocationFilter] = useState('');

  // Handler functions for filter changes
  const handleSectorChange = (e) => {
    const selectedSector = e.target.value;
    const projectsFilteredBySector = selectedSector
      ? projects.filter(project => project.sector === selectedSector)
      : projects;
    setFilteredProjects(projectsFilteredBySector);
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    const filteredByLocation = selectedLocation
      ? projects.filter(project => project.location === selectedLocation)
      : projects;
  
    // If a sector filter is already applied, apply it on top of the location filter
    const finalFiltered = sectorFilter
      ? filteredByLocation.filter(project => project.sector === sectorFilter)
      : filteredByLocation;
  
    setFilteredProjects(finalFiltered);
  };
  

  useEffect(() => {
    // Fetch all projects
    fetch('http://127.0.0.1:5000/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  // This should be set once, based on the fetched projects or passed from elsewhere
  const uniqueSectors = Array.from(new Set(projects.map(project => project.sector)));
  const uniqueLocations = Array.from(new Set(projects.map(project => project.location)));

  return (
    <>
      <Header
        onSectorChange={handleSectorChange}
        onLocationChange={handleLocationChange}
        sectors={uniqueSectors}
        locations={uniqueLocations}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                {/* ... */}
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <BudgetBars projectsData={filteredProjects} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <ProjectsTable projectData={filteredProjects} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
