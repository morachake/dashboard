import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CardHeader, Container, Card, Col, CardBody, Row, ListGroup, ListGroupItem, CardImg } from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader';
import config from 'config';


export default function CabinetTable() {
  const [projectData, setProjects] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const contractSumTemplate = (rowData) => {
    return formatCurrency(rowData.contract_sum);
  };
  useEffect(() => {
    fetch(`${config.backendURL}/forms`)
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);
  console.log(projectData)
  const onRowToggle = (e) => {
    setExpandedRows(e.data);
  };
  const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toLocaleString();
  };
  const rowExpansionTemplate = (data) => {
    const processRecommendations = (recommendations) => {
      return recommendations
        .split(/\d+\.\s*/)  
        .filter(item => item.trim() !== '');  
    };
    
    const recommendationsList = processRecommendations(data.recommendations);
    const formattedContractSum = formatCurrency(data.contract_sum);
    const renderListItems = (items) => items.map((item, index) => <ListGroupItem key={index}>{item}</ListGroupItem>);
    const certificatesList = data.certificates.map(cert => 
      `${cert.certificate_number}: ${formatCurrency(cert.amount_certified)}`);
    const totalAmountPaid = data.certificates.reduce((sum, cert) => sum + parseFloat(cert.amount_certified), 0);
    const formattedTotalAmountPaid = formatCurrency(totalAmountPaid);
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
              <p><h4>Total Amount Paid: {formattedTotalAmountPaid}</h4></p>
              <ListGroup>
                {renderListItems(certificatesList)}
              </ListGroup>
             
            </Col>
            <Col lg="6" md="12">
              <p><h4>Subcounty:</h4> {data.subcounty}</p>
              <p><h4>Ward:</h4> {data.ward}</p>
              <p><h4>Remarks:</h4> {data.remarks}</p>
              <p><h4>Recommendations:</h4></p>
              <ListGroup>
                {renderListItems(recommendationsList)}
              </ListGroup>
              <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                  <h5>Previous </h5>
                  <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                    <img src={data.before_images} alt={data.project_name} style={{ width: '100%', height: 'auto' }} />
                  </Card>
                </div>
                <div>
                  <h5>Present</h5>
                  <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                    <CardImg
                      top
                      style={{ width: '100%', height: 'auto' }}
                      src={data.after_images}
                      alt={data.project_name}
                    />
                  </Card>
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
                <Column field="subcounty" header="Subcounty" />
                <Column field="ward" header="Ward" />
                <Column field="contract_sum" header="Contract Sum" body={contractSumTemplate} />
              </DataTable>
            ) : (
              <div>No data available</div>
            )}
          </div>
        </CardHeader>
      </Container>
    </>
  );
}
