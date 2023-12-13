import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { chartOptions, parseOptions } from "variables/charts.js";
import Header from "components/Headers/Header.js";
import ProjectsTable from "components/Dashboard/ProjectsTable";
// import BudgetBars from "components/Dashboard/BudgetBars";
import BarChart from "components/Dashboard/BarChart";
import config from "config";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sectorFilter, setSectorFilter] = useState('');
  const [subcountyFilter, setSubcountyFilter] = useState('');
  const [wardFilter, setWardFilter] = useState('');
  const [uniqueSectors, setUniqueSectors] = useState([]);
  const [uniqueSubcounties, setUniqueSubcounties] = useState([]);
  const [uniqueWards, setUniqueWards] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); // Fetch the token from local storage
  
    fetch(`${config.backendURL}/forms`, {
      headers: {
        'Authorization': `Bearer ${accessToken}` // Include the authorization header
      }
    })
    .then(response => response.json())
    .then(data => {
      setProjects(data);
      setFilteredProjects(data);
      setUniqueSectors([...new Set(data.map(project => project.sector))]);
      setUniqueSubcounties([...new Set(data.map(project => project.subcounty))]);
      setUniqueWards([...new Set(data.map(project => project.ward))]);
    })
    .catch(error => console.error('Error fetching projects:', error));
  }, []);

  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);

  const filterProjects = () => {
    let result = projects;
  
    if (sectorFilter) {
      result = result.filter(project => project.sector === sectorFilter);
    }
    if (subcountyFilter) {
      result = result.filter(project => project.subcounty === subcountyFilter);
    }
    if (wardFilter) {
      result = result.filter(project => project.ward === wardFilter);
      console.log(result);
    }
  
    setFilteredProjects(result);
  };

  useEffect(() => {
    filterProjects();
  }, [sectorFilter, subcountyFilter, wardFilter, projects]);
  
  const handleSectorChange = (e) => {
    setSectorFilter(e.target.value);
  };





  const handleSubcountyChange = (e) => {
    console.log("Subcounty selected:", e.target.value);
    setSubcountyFilter(e.target.value);
  };
  

  const handleWardChange = (e) => {
    console.log("Ward selected:", e.target.value);
    setWardFilter(e.target.value);
  };
  
  return (
    <>
         {projects.length > 0 && (
        <Header
          onSectorChange={handleSectorChange}
          onLocationChange={handleSubcountyChange} 
          onWardChange={handleWardChange}
          sectors={uniqueSectors}
          locations={uniqueSubcounties} 
        />
      )}
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
              </CardHeader>
              <CardBody>
              <div className="chart">
              <BarChart data={filteredProjects} />
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
