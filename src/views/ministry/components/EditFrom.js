import config from 'config';
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    Form,
    CardBody
} from 'reactstrap';

function EditForm({ toggle, modal, project }) {
  const [formData,setFormData] = useState({...project  })
  const [locationOptions, setLocationOptions] = useState([]);
 const [selectedLocations, setSelectedLocations] = useState(
  formData.locations.map((location, index) => ({
    value: index,
    label: `${location.subcounty}, ${location.ward}`,
  }))
);


  const subCountyWards = {
    Mvita: ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
    Likoni: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
    Changamwe: ["Port Reitz", "Kipevu", "Airport", "Miritini", "Chaani"],
    Kisauni: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
    Nyali: ["Frere Town", "Ziwa la Ng’ombe", "Mkomani", "Kongowea", "Kadzandani"],
    Jomvu: ["Jomvu Kuu", "Magongo", "Mikindini"]
};

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  }

  useEffect(() =>{
   
      const options = formData.locations.map((location, index) => ({
        value: index,
        label : `${location.subcounty}, ${location.ward}`,
      }));
      setLocationOptions(options);

      const initialSelectedLocations = formData.locations.map((location, index) => ({
        value: index,
        label: `${location.subcounty}, ${location.ward}`,
      }));
      setSelectedLocations(initialSelectedLocations);
      },[project])
      
      useEffect(() =>{
           setFormData({
        ...project,
         start_date: formatDate(project.start_date),
         end_date: formatDate(project.end_date)
       })
      }, [project])
       console.log("Before submisssion",formData)
    const handleSubmit = (e) => {
    e.preventDefault();

      // console.log("Formatted start date:", formData.start_date);
      // console.log("Formatted end date:", formData.end_date);
      console.log("submission", formData)

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
      toast.success("Updated Successfully");
    })
    .catch(err => {
      console.error("An error occurred: " + err);
      toast.error("Update Failed Please try again later");
    });
  };

  const generateLocationOptions  = () =>{
    const options = [];
    for(const subCounty in subCountyWards){
      const wards = subCountyWards[subCounty];
      wards.forEach((ward) =>{
        options.push({label: `${subCounty},${ward}`,value: options.length})
      })
    }
    return options
  }

 const handleChange = (e, index, type) => {
    const { name, value } = e.target;

    if(name === 'start_date' || name === 'end_date'){
      setFormData({...formData, [name]: formatDate(value)});
    }else if (type === 'location') {
      const selectedLocationValues = selectedLocations.map((location) => location.value);
        setFormData((prevState) => {
          const updatedLocations = prevState.locations.map((loc, idx) =>
            idx === index ? { ...loc, [name]: value } : loc
          );
          console.log("Updated location: " , updatedLocations)
          return { ...prevState, locations: updatedLocations, selectedLocationValues };
        });
    } else if (type === 'certificate') {
      const updatedCertificates = formData.certificates.map((cert, idx) => 
        idx === index ? { ...cert, [name]: value } : cert
      );
      setFormData({ ...formData, certificates: updatedCertificates });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
 

  const handleCertificateItemChange = (index) => (e) => {
    const { name, value } = e.target;
    const updatedCertificates = formData.certificates.map((cert, idx) =>
      idx === index ? { ...cert, [name]: value } : cert
    );
    setFormData({ ...formData, certificates: updatedCertificates });
  };

  const addCertificateItem = () => {
    setFormData((prevFormData) => {
      const newCertificate = { certificate_number: '', amount_certified: '' };
      const updatedCertificates = [...prevFormData.certificates, newCertificate];
      return { ...prevFormData, certificates: updatedCertificates };
    });
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
                          <Input type='number' name="project_status_percentage" value={formData.project_status_percentage} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
            </Col>
          </Card>
           <Card>
              <CardHeader>You Project Location</CardHeader>
              <Col>
                  <Select
                    isMulti
                    options={locationOptions.concat(generateLocationOptions())}
                    value={selectedLocations}
                    name="locations"
                    onChange={(selectedOptions) => {
                      setSelectedLocations(selectedOptions);
                      console.log(selectedOptions);
                    }}
                  />
                </Col>
            </Card>
            
            <Card
                body
                className="my-2"
            >
                  <CardBody>
                      {project.certificates.map((certificate, index) => (
                        <Row lg={4} md={6} xs={12} style={{ alignItems: 'center' }} key={index}>
                          <Col md={6} lg={4}>
                            <FormGroup>
                              <Label for={`certificateNumber-${index}`}>Certificate Number</Label>
                              <Input
                                id={`certificateNumber-${index}`}
                                name="certificate_number"
                                placeholder="Certificate Number"
                                type="text"
                                value={certificate.certificate_number}
                                onChange={handleCertificateItemChange(index)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6} lg={4}>
                            <FormGroup>
                              <Label for={`amountCertified-${index}`}>Amount Certified</Label>
                              <Input
                                id={`amountCertified-${index}`}
                                name="amount_certified"
                                placeholder="Amount Certified"
                                type="text"
                                value={certificate.amount_certified}
                                onChange={handleCertificateItemChange(index)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      ))}
                  <Button color="primary" onClick={addCertificateItem}>Add Certificate</Button>
                </CardBody>     
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