import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { chartOptions, parseOptions } from "variables/charts.js";
import Header from "components/Headers/Header.js";
import ProjectsTable from "components/Dashboard/ProjectsTable";
import BudgetBars from "components/Dashboard/BudgetBars";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sectorFilter, setSectorFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  // Effect for Chart.js options
  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);

  // Combined filter function that filters first by location and then by sector
  const filterProjects = () => {
    let result = projects;

    if (locationFilter) {
      result = result.filter(project => project.location === locationFilter);
    }

    if (sectorFilter) {
      result = result.filter(project => project.sector === sectorFilter);
    }

    setFilteredProjects(result);
  };

  // Effect to filter projects whenever the filters change
  useEffect(() => {
    filterProjects();
  }, [sectorFilter, locationFilter, projects]);

  // Handlers for filter changes
  const handleSectorChange = (e) => {
    setSectorFilter(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  // Get unique sectors and locations for the dropdowns
  const uniqueSectors = [...new Set(projects.map(project => project.sector))];
  const uniqueLocations = [...new Set(projects.map(project => project.location))];

  return (
    <>
      <Header
        onSectorChange={handleSectorChange}
        onLocationChange={handleLocationChange}
        sectors={uniqueSectors}
        locations={uniqueLocations}
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                {/* ... */}
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <BudgetBars projectsData={filteredProjects} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xl="12">
            <ProjectsTable projectData={filteredProjects} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
