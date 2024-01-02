import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
// import { chartOptions, parseOptions } from "variables/charts.js";
import Header from "components/Headers/Header.js";
import ProjectsTable from "components/Dashboard/ProjectsTable";
import BudgetBars from "components/Dashboard/BudgetBars";
import config from "config";
import BarChart from "components/Dashboard/BarChart";
import UserHeader from "components/Headers/UserHeader";

const Index = () => {
 
  const [filteredProjects, setFilteredProjects] = useState([]);
 

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
        setFilteredProjects(data);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);


  return (
    <>
      <UserHeader />
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
