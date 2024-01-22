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
  const [typeFilter,setTypeFilter] = useState('');
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    fetch(`${config.backendURL}/forms`, {
     headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }

    })
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
        const allLocations = data.flatMap(project => project.locations)

        setUniqueSectors([...new Set(data.map(project => project.sector))]);
        setUniqueSubcounties([...new Set(allLocations.map(project => project.subcounty))]);
        setUniqueWards([...new Set(allLocations.map(project => project.ward))]);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);

 useEffect(() => {
  const filterProjects = () => {
    let result = projects;

    result = result.filter(project => {
      const matchesSector = sectorFilter ? project.sector === sectorFilter : true;
      const matchesSubcounty = subcountyFilter ? project.locations.some(location => location.subcounty === subcountyFilter) : true;
      const matchesWard = wardFilter ? project.locations.some(location => location.ward === wardFilter) : true;
      const matchesType  = typeFilter ? project.is_project === (typeFilter === 'project') : true
      return matchesSector && matchesSubcounty && matchesWard && matchesType;
    });
    setFilteredProjects(result);
  };
  filterProjects()
  }, [sectorFilter, subcountyFilter, wardFilter, projects,typeFilter]);

  const handleSectorChange = (e) => {
    setSectorFilter(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  }



  const handleSubcountyChange = (e) => {
    const selectedSubcounty = e.target.value;
    setSubcountyFilter(selectedSubcounty);
  
    setWardFilter('');
    const wardsInSubcounty = projects
      .flatMap(project => project.locations.filter(location => location.subcounty === selectedSubcounty))
      .map(location => location.ward);
    setUniqueWards([...new Set(wardsInSubcounty)]);
  };


  const handleWardChange = (e) => {
    setWardFilter(e.target.value);
  };

  return (
    <>
    
      <Header
          onSectorChange={handleSectorChange}
          onLocationChange={handleSubcountyChange}
          onWardChange={handleWardChange}
          onTypeChange={handleTypeChange}
          sectors={uniqueSectors}
          locations={uniqueSubcounties}
          wards={uniqueWards}
        />
      {projects.length > 0 ?(
        <>
         <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
              </CardHeader>
              <CardBody>
                <div className="chart">

                  <BarChart
                    data={filteredProjects}
                    isWardFilterApplied={wardFilter !== ''}
                   currentWardFilter={wardFilter}
                   currentFilter={{ sector: sectorFilter, subcounty: subcountyFilter, ward: wardFilter }}
                  />

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
       ) : (
        <Card>
                <CardHeader>
                  No data available
                </CardHeader>
                <CardBody>
                  Please Proceed to add data to your account for it to be visible here
                </CardBody>
              </Card>
       )}
     
    </>
  );
};

export default Index;
