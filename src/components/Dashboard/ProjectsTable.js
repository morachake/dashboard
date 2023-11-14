import React, { useState, useEffect } from 'react';
import {
  Button,
  CardHeader,
  CardBody,
  Table,
  Row,
} from "reactstrap";

export default function ProjectsTable() {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    // Fetch data from the endpoint when the component mounts
    fetch('http://127.0.0.1:5000/forms')
      .then(response => response.json())
      .then(data => setProjectsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);  // The empty dependency array ensures the effect runs only once when the component mounts

  const tableRows = projectsData.map(project => (
    <tr key={project.id}>
      <td>{project.amount_certified}</td>
      <td>{project.contract_sum}</td>
      <td>{project.contractor_details}</td>
      <td>{project.project_name}</td>
      <td>{project.status}</td>
      <td>{project.time_frame}</td>
    </tr>
  ));

  return (
    <>
      <CardBody className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Project Details</h3>
            </div>
            <div className="col text-right">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                See all
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Contract Sum</th>
              <th scope="col">Contractor</th>
              <th scope="col">Project Name</th>
              <th scope="col">Status</th>
              <th scope="col">Time Frame</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </Table>
      </CardBody>
    </>
  );
}
