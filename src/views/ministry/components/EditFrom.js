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
  useEffect(() =>{
      setFormData({...project })
      console.log(project)
  },[project])

  const handleSubmit = (e) => {
    e.preventDefault();
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

    if (type === 'location') {
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
                    <Input type="text" name="contractorDetails" value={formData.contractorDetails} onChange={handleChange} />
                  </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                      <Label for="contractSum">Contract Sum</Label>
                      <Input type="text" name="contractSum" value={formData.contractSum} onChange={handleChange} />
                    </FormGroup> 
                    </Col>      
                  </Row>
          </Col>
          <Col>
              <Row>
                  <Col>
                    <FormGroup>
                      <Label for="projectName">Project Name</Label>
                      <Input type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                        <Label for="Status">Status</Label>
                        <Input type='text' value={formData.status} onChange={handleChange} />
                    </FormGroup> 
                  </Col>
              </Row>
        </Col>
        </Card> 
         <Card>
              <FormGroup>
                  <Label for="Description">Description</Label>
                  <Input type='textarea' name='decsription' value={formData.description} onChange={handleChange}/>
              </FormGroup>
                <Col>
                    <Row>
                      <Col>
                      <FormGroup>
                          <Label for="Startdate">Start date</Label>
                          <Input type='date' name="startDate" value={formData.startDate} onChange={handleChange} />
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                          <Label for="Enddate">End date</Label>
                          <Input type='date' name="endDate" value={formData.endDate} onChange={handleChange}/>
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                          <Label for="Statuspercentage">status Percentage</Label>
                          <Input type='text' value={formData.statusPercentage} onChange={handleChange} />
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
                          <Button type="submit" color='danger' onClick={() => handleDelete(index,'location')}>Remove</Button>
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
                            // onChange={(e) => handleChange(e, index, 'certificate')}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="Ward">Amount</Label>
                          <Input 
                            type='text' 
                            value={certificate.amount_certified} 
                            // onChange={(e) => handleChange(e, index, 'certificate')}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <Button type="submit" color='danger' onClick={() => handleDelete(index,'certificate')}>Remove</Button>
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
