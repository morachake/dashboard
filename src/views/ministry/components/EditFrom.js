import config from 'config';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Label, 
    Input 
} from 'reactstrap';

function EditForm({ toggle, modal, project }) {

  const [formData,setFormaData] = useState({
    projectName:'',
    contractorDetails:'',
    contractSum:'',
    description:'',
    status:'',
    startDate:'',
    endDate:'',
    afterImages:'',
    certificates:'[]',
    locations:'[]',
    sectorName:'',
    statusPercentage:'',
  })
  useEffect(() =>{
    if(project){
      setFormaData({
        projectName : project.project_name || '',
        contractorDetails : project.contractor_details || '',
        contractSum : project.contract_sum || '',
        description : project.description || '',
        status: project.status || '',
        startDate : project.startDate || '',
        endDate : project.endDate || '',
        afterImages: project.afterImages || '',
        certificates: JSON.stringify(project.certificates || []),
        locations: JSON.stringify(project.locations || []),
        statusPercentage : project.project_status_percentage || '',
      })
    }
  },[project])

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

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormaData(prevState =>({
        ...prevState,
        [name] : value
    }))
  }


  // const handleSubmit = () => {
  //   toggle(); 
  // };

  return (
     <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Project: {formData.projectName}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="projectName">Project Name</Label>
          <Input type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="contractorDetails">Contractor Details</Label>
          <Input type="text" name="contractorDetails" value={formData.contractorDetails} onChange={handleChange} />
        </FormGroup>
        {/* ... Add other form fields similarly ... */}
        <FormGroup>
          <Label for="contractSum">Contract Sum</Label>
          <Input type="text" name="contractSum" value={formData.contractSum} onChange={handleChange} />
        </FormGroup>
       <FormGroup>
          <Label for="Description">Description</Label>
          <Input type='textarea' value={formData.description} onChange={handleChange}/>
       </FormGroup>
       <FormGroup>
          <Label for="Status">Status</Label>
          <Input type='text' value={formData.status} onChange={handleChange} />
       </FormGroup> 
       <FormGroup>
          <Label for="Startdate">Start date</Label>
          <Input type='date' value={formData.startDate} onChange={handleChange}/>
       </FormGroup>
       <FormGroup>
          <Label for="Enddate">End date</Label>
          <Input type='date' value={formData.endDate} onChange={handleChange}/>
       </FormGroup>
       <FormGroup>
        <Label for="Statuspercentage">status Percentage</Label>
        <Input type='text' value={formData.statusPercentage} onChange={handleChange} />
       </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Update</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditForm;
