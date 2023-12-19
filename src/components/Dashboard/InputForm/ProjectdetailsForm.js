import ValidatedInput from 'components/Reusable/ValidatedInput';
import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';


export const ProjectDetailsForm = ({ formData, handleInputChange, handleValidationStateChange, requiredValidator }) => {
  return (
    <div>
      <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={6}>
          <ValidatedInput
            label="Project Name"
            id="project_name"
            name="project_name"
            placeholder="Enter the project name"
            type="text"
            value={formData.project_name}
            onChange={handleInputChange}
            validator={(value) => !value ? 'Required' : ''}
            onValidationStateChange={handleValidationStateChange}
          /></Col>
        <Col md={6} lg={3}>
          <Label for="status">Select Status</Label>
          <Input
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="complete">Complete</option>
            <option value="stalled">Stalled</option>
          </Input>
        </Col>
        <Col md={6} lg={3}>
          <ValidatedInput
            label="Status"
            id="project_status_percentage"
            name="project_status_percentage"
            placeholder="Enter the project status"
            type="number"
            value={formData.project_status_percentage}
            onChange={handleInputChange}
            validator={requiredValidator}
            onValidationStateChange={handleValidationStateChange}
          />

        </Col>
      </Row>
      <ValidatedInput
        label="Project Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleInputChange}
        validator={(value) => !value ? 'Required' : ''}
        onValidationStateChange={handleValidationStateChange}
      />
      <ValidatedInput
        label="Remarks"
        id="remarks"
        name="remarks"
        placeholder="Enter any remarks"
        type="textarea"
        value={formData.remarks}
        onChange={handleInputChange}
        validator={requiredValidator}
        onValidationStateChange={handleValidationStateChange}
      />




      <ValidatedInput
        label="Recommendations"
        id="recommendations"
        name="recommendations"
        placeholder="Enter any recommendations"
        type="textarea"
        value={formData.recommendations}
        onChange={handleInputChange}
        validator={requiredValidator}
        onValidationStateChange={handleValidationStateChange}
      />
       <ValidatedInput
        label="Contractor Details"
        id="contractor_details"
        name="contractor_details"
        placeholder="Enter any Contractor Detailes"
        type="textarea"
        value={formData.contractor_details}
        onChange={handleInputChange}
        validator={requiredValidator}
        onValidationStateChange={handleValidationStateChange}
      />

      <Row lg={4} md={6} xs={12}>
        <Col md={6} lg={4}>
          <ValidatedInput
            label="Start Date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleInputChange}
            validator={requiredValidator}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
        <Col md={6} lg={4}>
          <ValidatedInput
            label="End Date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleInputChange}
            validator={requiredValidator}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>
        <Col md={6} lg={4}>
          <ValidatedInput
            label="Contract Sum"
            id="contract_sum"
            name="contract_sum"
            placeholder="Enter the contract sum"
            type="number"
            value={formData.contract_sum}
            onChange={handleInputChange}
            //validator={numberValidator}
            onValidationStateChange={handleValidationStateChange}
          />
        </Col>

      </Row>
    </div>
  );
};
