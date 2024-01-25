import config from 'config';
import React, { useEffect, useState } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Label, 
    Input,
    Col,
    Row,
    Card,
    CardHeader,
    Form
} from 'reactstrap';

function EditForm({ toggle, modal, project }) {
  const [formData,setFormData] = useState({...project  })
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

  useEffect(() =>{
      setFormData({
        ...project,
         start_date: formatDate(project.start_date),
         end_date: formatDate(project.end_date)
       })
      },[project])
      
      console.log("your projects",project)
  const handleSubmit = (e) => {
    e.preventDefault();

      console.log("Formatted start date:", formData.start_date);
      console.log("Formatted end date:", formData.end_date);

    const accessToken = localStorage.getItem('accessToken');

    fetch(`${config.backendURL}/update_form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        ...formData,
        form_id: project.id
      })
    })
    // console.log(formData)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not send update request: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      toggle();
    })
    .catch(err => {
      console.error("An error occurred: " + err);
    });
  };


 const handleChange = (e, index, type) => {
    const { name, value } = e.target;

    if(name === 'start_date' || name === 'end_date'){
      setFormData({...formData, [name]: formatDate(value)});
    }else if (type === 'location') {
      const updatedLocations = formData.locations.map((loc, idx) => 
        idx === index ? { ...loc, [name]: value } : loc
      );
      setFormData({ ...formData, locations: updatedLocations });
    } else if (type === 'certificate') {
      const updatedCertificates = formData.certificates.map((cert, idx) => 
        idx === index ? { ...cert, [name]: value } : cert
      );
      setFormData({ ...formData, certificates: updatedCertificates });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
   const handleDelete = (index, type) => {
    if (type === 'location') {
      const filteredLocations = formData.locations.filter((_, i) => i !== index);
      console.log(filteredLocations)
      setFormData({ ...formData, locations: filteredLocations });
    } else if (type === 'certificate') {
      const filteredCertificates = formData.certificates.filter((_, i) => i !== index);
      setFormData({ ...formData, certificates: filteredCertificates });
    }
  };

  return (
     <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Edit Project: {project.projectName}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} >
          <Card>
          <Col> 
                  <Row>
                    <Col>
                    <FormGroup>
                    <Label for="contractorDetails">Contractor Details</Label>
                    <Input type="text" name="contractor_details" value={formData.contractor_details} onChange={handleChange} />
                  </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                      <Label for="contractSum">Contract Sum</Label>
                      <Input type="text" name="contract_sum" value={formData.contract_sum} onChange={handleChange} />
                    </FormGroup> 
                    </Col>      
                  </Row>
          </Col>
          <Col>
              <Row>
                  <Col>
                    <FormGroup>
                      <Label for="projectName">Project Name</Label>
                      <Input type="text" name="project_name" value={formData.project_name} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                        <Label for="Status">Status</Label>
                        <Input type='select' name='status' value={formData.status} onChange={handleChange} >
                            <option value="Ongoing">Ongoing</option>
                            <option value="Complete">Complete</option>
                            <option value="Stalled">Stalled</option>
                        </Input>
                    </FormGroup> 
                  </Col>
              </Row>
        </Col>
        </Card> 
         <Card>
              <FormGroup>
                  <Label for="Description">Description</Label>
                  <Input type='textarea' name='description' value={formData.description} onChange={handleChange}/>
              </FormGroup>
                <Col>
                    <Row>
                      <Col>
                     <FormGroup>
                          <Label for="Startdate">Start date</Label>
                          <Input type='date' name="start_date" value={formData.start_date} onChange={handleChange} />
                      </FormGroup> 
                      </Col>
                      <Col>
                     <FormGroup>
                          <Label for="Enddate">End date</Label>
                          <Input type='date' name="end_date" value={formData.end_date} onChange={handleChange}/>
                      </FormGroup> 
                      </Col>
                      <Col>
                      <FormGroup>
                          <Label for="Statuspercentage">status Percentage</Label>
                          <Input type='number' value={formData.project_status_percentage} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
            </Col>
          </Card>
           <Card>
            <CardHeader>You Project Location</CardHeader>
             <div className="scrollable-card-content">
                {formData.locations.map((location,index) =>(
                <Col key={index}>
                    <Row>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <Label for="Status">Subcounty</Label>
                        <Input 
                        type='text' 
                        value={location.subcounty}  
                        onChange={(e) => handleChange(e,index,'location')}
                        />
                      </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="Ward">Ward</Label>
                          <Input 
                          type='text' 
                          value={location.ward} 
                           onChange={(e) => handleChange(e,index,'location')}
                          />
                        </FormGroup>
                      </Col>
                       <Col>
                          <Button type="button" color='danger' onClick={() => handleDelete(index,'location')}>Remove</Button>
                      </Col>  
                </Row>
              </Col>
          ))}
            </div>
            
       </Card>
          <Card >
              <CardHeader>Your Current Certificates</CardHeader>
              <div className="scrollable-card-content">
                {formData.certificates.map((certificate, index) => (
                  <Col md={12} xs={12} key={index}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="certno">Cert No</Label>
                          <Input 
                            type='text'
                            value={certificate.certificate_number} 
                            onChange={(e) => handleChange(e, index, 'certificate')}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="Ward">Amount</Label>
                          <Input 
                            type='text' 
                            value={certificate.amount_certified} 
                            onChange={(e) => handleChange(e, index, 'certificate')}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <Button type="button" color='danger' onClick={() => handleDelete(index,'certificate')}>Remove</Button>
                      </Col>       
                    </Row>
                  </Col>
                ))}
              </div>
            </Card>
       </Form>
      </ModalBody>
      <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Update</Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditForm;
