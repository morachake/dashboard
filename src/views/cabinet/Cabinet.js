// Cabinet.js
import React, { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext'; // Make sure this import path is correct
import BudgetChart from 'components/Dashboard/BudgetChart';
import UserHeader from 'components/Headers/UserHeader';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from 'reactstrap';

const Cabinet = () => {
  const { user } = useAuth(); // Assuming useAuth provides the logged-in user's details
  const [projectStatusData, setProjectStatusData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/forms') // Replace with your actual API endpoint to fetch projects
      .then(response => response.json())
      .then(data => {
        // Filter the projects based on the logged-in user's ID
        const userRelatedProjects = data.filter(project => project.user_id === user.id);
        
        // Count the number of projects for each status
        const statusCounts = userRelatedProjects.reduce((acc, project) => {
          acc[project.status] = (acc[project.status] || 0) + 1;
          return acc;
        }, {});

        // Calculate the percentages for each status
        const totalProjects = userRelatedProjects.length;
        const statusPercentages = Object.keys(statusCounts).map(status => ({
          name: status,
          value: (statusCounts[status] / totalProjects) * 100,
        }));

        setProjectStatusData(statusPercentages);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [user.id]); // Depend on user.id to refetch when it changes

  return (
    <>
    <UserHeader />
    <Container className="mt--7" fluid>
      <Row className="justify-content-center">
        <Col xl="6" lg="8"> {/* Adjust the column sizes to fit your design */}
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h6 className="text-uppercase text-muted ls-1 mb-1">
                Performance by Project Status
              </h6>
            </CardHeader>
            <CardBody>
              {/* Add padding within the chart container and center it */}
              <div className="chart d-flex justify-content-center align-items-center" style={{ padding: '2rem' }}>
                {projectStatusData.length > 0 && (
                  <BudgetChart chartData={projectStatusData} />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
  
  );
};

export default Cabinet;
