import ValidatedInput from 'components/Reusable/ValidatedInput';
import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';


export const ProjectDetailsForm = ({ formData, handleInputChange, handleValidationStateChange,formErrors, requiredValidator }) => {
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
            error={formErrors.project_name}
          />
          </Col>
        <Col md={6} lg={3}>
          <Label for="status">Select Status</Label>
          <Input
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            error={formErrors.status}
          >
            <option value="">Select Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="complete">Complete</option>
            <option value="stalled">Stalled</option>
          </Input>
          {/* <FormFeedback>{formErrors.status}</FormFeedback> */}
        </Col>
        <Col md={6} lg={3}>
          <ValidatedInput
            label="Completion Pecentage"
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
        label="Project Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleInputChange}
        validator={(value) => !value ? 'Required' : ''}
        onValidationStateChange={handleValidationStateChange}
        error={formErrors.description}
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
            error={formErrors.start_date}
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
            error={formErrors.end_date}
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
            error={formErrors.contract_sum}
          />
        </Col>
        </Row>
          <ValidatedInput
        label="Contractor Details"
        id="contractor_details"
        name="contractor_details"
        placeholder="Enter any Contractor Detailes"
        type="text"
        value={formData.contractor_details}
        onChange={handleInputChange}
        validator={requiredValidator}
        onValidationStateChange={handleValidationStateChange}
        error={formErrors.contractor_details}
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
        error={formErrors.remarks}
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
        error={formErrors.recommendations}
      />
     
    </div>
  );
};
