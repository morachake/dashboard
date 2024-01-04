import React, { useEffect, useState } from 'react';
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
  const [projectData, setProjectData] = useState(project)
  const [projectName, setProjectName] = useState(project?.project_name || '');
  const [contractorDetails, setContractorDetails] = useState(project?.contractor_details || '');
  const [contractSum, setContractSum] = useState(project?.contract_sum || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState(project?.status || '');
  const [startDate, setStartDate] = useState(project?.start_date || '');
  const [endDate, setEndDate] = useState(project?.end_date || '');
  const [beforeImages, setBeforeImages] = useState(project?.before_images || '');
  const [afterImages, setAfterImages] = useState(project?.after_images || '');
  const [certificates, setCertificates] = useState(JSON.stringify(project?.certificates || []));
  const [locations, setLocations] = useState(JSON.stringify(project?.locations || []));
  const [recommendations, setRecommendations] = useState(project?.recommendations || '');
  const [sector, setSector] = useState(project?.sector || '');
  const [statusPercentage, setStatusPercentage] = useState(project?.project_status_percentage || 0);

  useEffect(( ) =>{
    setProjectData(project)
  },[project])

  const handleSubmit = () => {
    toggle(); 
  };

  return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{projectName}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="projectName">Project Name</Label>
            <Input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="contractorDetails">Contractor Details</Label>
            <Input type="text" value={contractorDetails} onChange={(e) => setContractorDetails(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="beforeImages">Contract Sum</Label>
            <Input type="text" value={contractSum} onChange={(e) => setContractSum(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="certificates">Certificates No</Label>
            <Input type="text" placeholder='certificate Number'/>
          </FormGroup>
          <FormGroup>
            <Label for="locations">Amount </Label>
            <Input type="text" placeholder='Amount Approved'/>
          </FormGroup>
          <FormGroup>
            <Label for="locations">Sub County</Label>
            <Input type='text' placeholder='locationAmount Approved'/>
          </FormGroup>
          <FormGroup>
            <Label for="ward">Ward</Label>
            <Input type='text' placeholder='Ward'/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Update
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
  );
}

export default EditForm;
