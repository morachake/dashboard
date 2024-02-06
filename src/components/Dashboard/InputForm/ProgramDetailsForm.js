import ValidatedInput from 'components/Reusable/ValidatedInput';
import React ,{useState} from 'react';
import Select from 'react-select';
import { Row, Col, Input, Label,Card } from 'reactstrap';


export const ProgramDetailsForm = ({ 
  formData, 
  handleInputChange, 
  handleValidationStateChange,
  formErrors,
   requiredValidator ,
   programs,
    subCountyWards,
    caption,
    onLocationChange,
    index,
    
  }) => {
     const [selectedLocation,setSelectedLocation]= useState([])
    const generateLocationOptions =() =>{
        const locationOptions = Object.keys(subCountyWards).map((subCounty) =>{
            const wards = subCountyWards[subCounty].map((ward) =>({value:ward,label:ward, subCounty}))
            return {label:subCounty,options : wards}
        });
        return locationOptions
    }
    const handleSelectLocation = (selectedOptions) => {
        console.log("Selected Location Options:", selectedOptions);

        const selectedLocationData = selectedOptions.map((option, idx) => ({
            subCounty: option.subCounty,
            ward: option.value,
            key: `${option.subCounty}-${option.value}-${idx}`
        }));

        console.log("Selected Location Data:", selectedLocationData);

        setSelectedLocation(selectedOptions);
        console.log("selectedOptions:", selectedOptions);
        onLocationChange(selectedOptions);
    };  

    const customStyles ={
        control:(provider) =>({
            ...provider,
            width :'100%',
            marginBottom:10
        })
    }
  return (
    <div>
        <Row className='mb-4'>
          <Col>
          <Label for="status">Select Program Name</Label>
          <Input
            id="program_id"
            name="program_id"
            type="select"
            value={formData.program_id}
            onChange={handleInputChange}
          >
            <option value="">Select a Program</option>
            {programs.map(program => (
              <option key={program.id} value={program.id} onChange={handleInputChange}>{program.program_name}</option> 
            ))}
          </Input>
         </Col>
        </Row>
      <Row lg={4} md={6} xs={12} mt={5}>
        
        <Col md={6}  lg={6}>
          <ValidatedInput
            label="Activity Name"
            id="program_name"
            name="project_name"
            type="text"
            value={formData.project_name}
            onChange={handleInputChange}
            validator={(value) => !value ? 'Required' : ''}
            onValidationStateChange={handleValidationStateChange}
            error={formErrors.project_name}
          />
          </Col>
        <Col md={6} lg={3}>
          <Label for="status">Activity Status</Label>
          <Input
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            error={formErrors.status}
          >
            <option value="">Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Complete">Complete</option>
            <option value="Stalled">Stalled</option>
          </Input>
        </Col>
        <Col md={6} lg={3}>
          <ValidatedInput
            label="Pecentage"
            id="project_status_percentage"
            name="project_status_percentage"
            placeholder="Enter the project status"
            type="number"
            value={formData.project_status_percentage}
            onChange={handleInputChange}
            validator={requiredValidator}
            onValidationStateChange={handleValidationStateChange}
            error={formErrors.project_status_percentage}
          />

        </Col>
      </Row>
      <ValidatedInput
        label="Describe the activity"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleInputChange}
        validator={(value) => !value ? 'Required' : ''}
        onValidationStateChange={handleValidationStateChange}
        error={formErrors.description}
      />
       <ValidatedInput
        label="Describe the milestones"
        name="milestones"
        type="textarea"
        value={formData.milestones}
        onChange={handleInputChange}
        validator={(value) => !value ? 'Required' : ''}
        onValidationStateChange={handleValidationStateChange}
        error={formErrors.milestones}
      />
      
      <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={6}>
          <ValidatedInput
            label="Start Date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleInputChange}
            validator={requiredValidator}
            onValidationStateChange={handleValidationStateChange}
            error={formErrors.start_date}
          />
        </Col>
        <Col md={6} lg={6}>
          <ValidatedInput
            label="End Date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleInputChange}
            validator={requiredValidator}
            onValidationStateChange={handleValidationStateChange}
            error={formErrors.end_date}
          />
        </Col>
        </Row>
         <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={6}>
          <ValidatedInput
            label="Financier"
            id="financier"
            name="financier"
            type="text"
            value={formData.financier}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
        <Col md={6} lg={6}>
          <ValidatedInput
            label="Expenditure"
            id="contract_sum"
            name="contract_sum"
            type="number"
            value={formData.contract_sum}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
      </Row> 
            <Card body className="my-2">
              <Label for={`subcounty-${index}`}>Sub-County</Label>
                <Select
                    options={generateLocationOptions()}
                    isMulti
                    value={selectedLocation}
                    onChange={handleSelectLocation}
                    styles={customStyles}
                    // menuIsOpen={true}
                    onMenuClose={() => {}}
                />
            </Card>

    </div>
  );
};
