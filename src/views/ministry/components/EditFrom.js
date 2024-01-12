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
  const [currentPage ,setCurrentPage] = useState(1)
  const totalPages = 3

  const [formData,setFormData] = useState({
    projectName:'',
    contractorDetails:'',
    contractSum:'',
    description:'',
    status:'',
    startDate:'',
    endDate:'',
    afterImages:'',
   // certificates:'[]',
   // locations:'[]',
    sectorName:'',
    statusPercentage:'',
  })
  useEffect(() =>{
    if(project){
      setFormData({
        form_id : project.id,
        projectName : project.project_name || '',
        contractorDetails : project.contractor_details || '',
        contractSum : project.contract_sum || '',
        description : project.description || '',
        status: project.status || '',
        startDate : project.startDate || '',
        endDate : project.endDate || '',
        afterImages: project.afterImages || '',
       // certificates: project.certificates || [],
       // locations: project.locations || [],
        statusPercentage : project.project_status_percentage || '',
      })
    }
  },[project])
// console.log("here is your projetc",project.certificates)
  const handleSubmit = () =>{
    const accessToken = localStorage.getItem('accessToken')
     fetch(`${config.backendURL}/update_form`, {
      method : 'POST' ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)
    })
    .then((response) => { 
      if(!response.ok){
        throw new Error(`Could not not send update request : ${response.status}`)
      }
      return response.json()
    })
    .then((response) => {
      console.log("Successfully",response)
      toggle();
    })
    .catch((err) => {
      console.error("na error occures" + err)
    });
  }



const handleChange = (e, index, type) => {
  const { name, value } = e.target;

  // if (type === 'location') {
  //   const updatedLocations = [...formData.locations];
  //   updatedLocations[index] = { ...updatedLocations[index], [name]: value };
  //   setFormData({ ...formData, locations: updatedLocations });
  // } else if (type === 'certificate') {
  //   const updatedCertificates = [...formData.certificates];
  //   updatedCertificates[index] = { ...updatedCertificates[index], [name]: value };
  //   setFormData({ ...formData, certificates: updatedCertificates });
  // } else {
    setFormData({ ...formData, [name]: value });
  // }
};


  

  const goToNextPage = () =>{
    setCurrentPage(currentPage + 1)
  }
  const goToPreviuosPage = () =>{
    setCurrentPage(currentPage -1)
  }
  return (
     <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Edit Project: {project.projectName}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} >
        {currentPage === 1 && (
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
        )}
        {/* {currentPage === 2 && (
           <Card>
            <CardHeader>You Project Locations</CardHeader>
              {project.locations.map((location,index) =>(
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
                          <Button type="submit" color='danger'>Remove</Button>
                      </Col>  
                </Row>
              </Col>
          ))}
       </Card>
        )}    */}
      
      {/* {currentPage === 3 && (
          <Card>
              <CardHeader>You Current Certificates</CardHeader>
                    {project.certificates.map((certificate,index) =>(
                    <Col md={12} xs={12} key={index}>
                        <Row>
                        <Col>
                          <FormGroup>
                            <Label for="certno">Cert No</Label>
                            <Input type='text'
                            value={certificate.certificate_number} 
                            onChange={(e) => handleChange(e,index,'certificate')}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                              <Label for="Ward">Amount</Label>
                              <Input 
                              type='text' 
                              value={certificate.amount_certified} 
                              onChange={(e) => handleChange(e,index,'certificate')}
                              />
                            </FormGroup>
                        </Col>
                        <Col>
                          <Button type="submit" color='danger'>Remove</Button>
                      </Col>       
                  </Row>
                  </Col>
                  ))}
            </Card>
      )} */}
     
       {currentPage === 3 &&(
         <Card>
              <FormGroup>
                  <Label for="Description">Description</Label>
                  <Input type='textarea' name='decsription' value={project.description} onChange={handleChange}/>
              </FormGroup>
                <Col>
                    <Row>
                      <Col>
                      <FormGroup>
                          <Label for="Startdate">Start date</Label>
                          <Input type='date' value={formData.startDate} onChange={handleChange} />
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                          <Label for="Enddate">End date</Label>
                          <Input type='date' value={formData.endDate} onChange={handleChange}/>
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
       )}
       </Form>
      </ModalBody>
      <ModalFooter>
        {currentPage > 1 && totalPages &&(
             <Button color="primary" onClick={goToPreviuosPage}>Back</Button>
        )
        }
        {currentPage < totalPages && (
             <Button color="primary" onClick={goToNextPage}>Next</Button>
        )}
        {currentPage === totalPages && (
          <Button color="primary" onClick={handleSubmit}>Update</Button>
        ) }
      </ModalFooter>
    </Modal>
  );
}

export default EditForm;
