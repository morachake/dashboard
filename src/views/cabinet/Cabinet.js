import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import BudgetChart from "components/Dashboard/BudgetChart";
import UserHeader from "components/Headers/UserHeader";
import config from "config";

const Cabinet = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    fetch(`${config.backendURL}/forms`,{
      headers: { 
        'Authorization': `Bearer${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const processedData = data.map(project => ({
          ...project,
          status: parseFloat(project.status)
        }));
        setProjects(processedData);
        setFilteredProjects(processedData);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const getStatusCategoryData = (projects) => {
    const categories = {
      'Above 90%': 0,
      '70% - 90%': 0,
      '50% - 70%': 0,
      '20% - 50%': 0,
    };

    projects.forEach(project => {
      const status = project.status;
      if (status > 90) categories['Above 90%']++;
      else if (status > 70) categories['70% - 90%']++;
      else if (status > 50) categories['50% - 70%']++;
      else if (status > 20) categories['20% - 50%']++;
    });

    return Object.keys(categories).map(key => ({
      name: key,
      value: categories[key],
    }));
  };

  const chartData = getStatusCategoryData(filteredProjects);

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent color-white">
              Project completion percentage
              </CardHeader>
              <CardBody>
                {/* <BudgetChart chartData={chartData} /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cabinet;
