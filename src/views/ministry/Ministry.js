import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
// import { chartOptions, parseOptions } from "variables/charts.js";
import Header from "components/Headers/Header.js";
import ProjectsTable from "components/Dashboard/ProjectsTable";
import BudgetBars from "components/Dashboard/BudgetBars";
import config from "config";
import UserHeader from "components/Headers/UserHeader";

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
    const accessToken = localStorage.getItem('accessToken');
    fetch(`${config.backendURL}/forms`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    }
    )
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
  }, [projects]);
  

  //   if (window.Chart) {
  //     parseOptions(Chart, chartOptions());
  //   }
  // }, []);

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
    }
  
    setFilteredProjects(result);
  };

  useEffect(() => {
    filterProjects();
  }, [sectorFilter, subcountyFilter, wardFilter, projects]);
  

  return (
    <>
    <UserHeader/>
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                {/* ... */}
              </CardHeader>
              <CardBody>
                <div className="chart">
                <BudgetBars filteredProjects={filteredProjects} />
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
