import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CardHeader, Container, Card, Col, CardBody, Row, ListGroup, ListGroupItem, CardImg, Table } from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader';
import { useAuth } from 'context/AuthContext';
import config from 'config';

export default function MinTable() {
  const [projectData, setProjects] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const user = useAuth()

  const accessToken = localStorage.getItem('accessToken')
  fetch(`${config.backendURL}/forms`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
    .then(data => {
      // const filteredProjects = data.filter(project => project.user_id === user.id);
      setProjects(data)

    })
    .catch(error => console.error('Error fetching projects:', error));

  // console.log(projectData)
  const onRowToggle = (e) => {
    setExpandedRows(e.data);
  };

  function formatReadableDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  const startDateTemplate = (rowData) => {
    return <span>{formatReadableDate(rowData.start_date)}</span>;
  };
  
  const endDateTemplate = (rowData) => {
    return <span>{formatReadableDate(rowData.end_date)}</span>;
  };
  const renderRemarks = (remarks) => {
    return remarks.map((remark, index) => (
      <ListGroup key={index}>
        <p>{remark.text}</p>
      </ListGroup>

    ))
  }

  const formatCurrency = (value) => {
    // Check if value is a number or can be converted to one
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toLocaleString();
  };
  const rowExpansionTemplate = (data) => {
    const processRecommendations = (recommendations) => {
      if(!recommendations){
        return [];
      }
      return recommendations
        .split(/\d+\.\s*/)  // Split by the number followed by a period and space
        .filter(item => item.trim() !== '');  // Filter out empty strings
    };
    const recommendationsList = processRecommendations(data.recommendations);



    const formattedContractSum = formatCurrency(data.contract_sum);

    // Render List Items
    const renderListItems = (items) => items.map((item, index) => <ListGroupItem key={index}>{item}</ListGroupItem>);

    const certificatesList = data.certificates.map(cert => `${cert.certificate_number}: ${cert.amount_certified}`);
    const locationList = data.locations.map(loc => `${loc.subcounty}, ${loc.ward}`);

    const renderLocation = (locations) => {
      if (!locations || locations.length === 0) {
        return <h5>No location data available.</h5>;
      }
      return (
        <Card>
          <Table>
          <thead>
            <tr>
              <th scope='row'>Subcounty</th>
              <th>Ward</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>{location.subcounty}</td>
                <td>{location.ward}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Card>
      );
    };
    const renderCertificates = (certificates) => {
      if (!certificates || certificates.length === 0) {
        return <h5>No certificate data available.</h5>;
      }
      return (
        <Card>
           <Table>
          <thead>
            <tr>
              <th>Certificate Number</th>
              <th>Amount Certified</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={index}>
                <td>{cert.certificate_number}</td>
                <td>{formatCurrency(cert.amount_certified)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Card>
       
      );
    };
   
    return (
      <Card>
        <CardHeader>
          <h5>Details for {data.project_name}</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg="6" md="12">
              <p><h4>Description:</h4> {data.description}</p>
              <p><h4>Contractor Details:</h4> {data.contractor_details}</p>
              <p><h4>Contract Sum:</h4> {formattedContractSum}</p>
              <p><h4>Status:</h4> {data.status}</p>
              <p><h4>Time Frame:</h4> {data.time_frame}</p>
              <p><h4>Certificates:</h4></p>
              <ListGroup>
                {renderCertificates(data.certificates)}
              </ListGroup>
            </Col>
            <Col lg="6" md="12">
              <Card body
                className="my-2">
                <h4>Project Location</h4>
                <div>{renderLocation(data.locations)}</div>
              </Card>

              <Card body
                className="my-2">
                <h4>Remarks:</h4>
                <p> {renderRemarks(data.remarks).slice(0, 2)}
                </p>
              </Card>
              <Card body
                className="my-2">
                <p><h4>Recommendations:</h4></p>
                <ListGroup>
                  {renderListItems(recommendationsList)}
                </ListGroup>
              </Card>

              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div>
                    {
                      data.before_images && (
                        <>
                          <h5>Previous </h5>
                          <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                            <img src={data.before_images} alt={data.project_name} style={{ width: '100%', height: 'auto' }} />
                          </Card>
                        </>
                      )
                    }

                  </div>
                  <div>
                    {
                      data.after_images && (
                        <>
                          <h5>Present</h5>

                          <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                            <CardImg
                              top
                              style={{ width: '100%', height: 'auto' }}
                              src={data.after_images}
                              alt={data.project_name}
                            />
                          </Card>

                        </>

                      )

                    }

                  </div>
                </div>
              </CardHeader>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };




  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <CardHeader>
          <div className="card">
            {projectData && projectData.length > 0 ? (
              <DataTable
                value={projectData}
                paginator
                rows={10}
                dataKey="id"
                emptyMessage="No projects found."
                expandedRows={expandedRows}
                onRowToggle={onRowToggle}
                rowExpansionTemplate={rowExpansionTemplate}
              >
                <Column expander style={{ width: '3em' }} />
                <Column field="project_name" header="Project Name" />
                <Column field="status" header="Status" />
                <Column field="start_date" header="Start Date" body={startDateTemplate} />
              <Column field="end_date" header="End Date" body={endDateTemplate} />
                <Column field="contract_sum" header="Contract Sum" />
              </DataTable>
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
          </div>
        </CardHeader>
      </Container>
    </>
  );
}
