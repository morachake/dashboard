import ValidatedInput from 'components/Reusable/ValidatedInput';
import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';

export const ProgramDetailsForm = ({ 
  formData, 
  handleInputChange, 
  handleValidationStateChange, 
  formErrors, 
  requiredValidator,
  programs 
}) => {

  
  return (
    <div>
      {/* Basic Program Details */}
      <Row>
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
              <option key={program.id} value={program.id} onChange={handleInputChange}>{program.department_name}</option> 
            ))}
          </Input>
         </Col>
      </Row>
      <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={8}>
          <ValidatedInput
            label="Program Name"
            id="project_name"
            name="project_name"
            type="text"
            value={formData.project_name}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
        <Col md={6} lg={4}>
          <Label for="status">Select Status</Label>
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
      </Row>

      {/* Date Information */}
      <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={6}>
          <ValidatedInput
            label="Start Date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
        <Col md={6} lg={6}>
          <ValidatedInput
            label="End Date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
      </Row>

      {/* Program Progress and Metrics */}
      <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={4}>
          <ValidatedInput
            label="Percentage"
            id="project_status_percentage"
            name="project_status_percentage"
            type="number"
            value={formData.project_status_percentage}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
        <Col md={6} lg={4}>
          <ValidatedInput
            label="Contract Sum"
            id="contract_sum"
            name="contract_sum"
            type="number"
            value={formData.contract_sum}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
        <Col md={6} lg={4}>
          <ValidatedInput
            label="Milestones"
            id="milestones"
            name="milestones"
            type="text"
            value={formData.milestones}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
      </Row>

      {/* Financial Information */}
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
            label="Contract Sum USD"
            id="contract_sum_usd"
            name="contract_sum_usd"
            type="number"
            value={formData.contract_sum_usd}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
      </Row>

      {/* Additional Information */}
      <ValidatedInput
        label="Program Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleInputChange}
        onValidationStateChange={handleValidationStateChange}
        error={formErrors.description}
      />
      <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={12}>
          <ValidatedInput
            label="Contractor Details"
            id="contractor_details"
            name="contractor_details"
            type="text"  
            value={formData.contractor_details}
            onChange={handleInputChange}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
      </Row>
    </div>
  );
};
