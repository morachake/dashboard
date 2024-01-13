// formValidator.js
const validateProjectDetails = (formData) => {
    let errors = {};
    let isValid = true;

    // Validation for Project Name
    if (!formData.project_name.trim()) {
        errors.project_name = "Project Name is required";
        isValid = false;
    }

    // Validation for Status - ensuring a status is selected
    if (!formData.status) {
        errors.status = "Selecting a status is required";
        isValid = false;
    }

    // Validation for Project Status Percentage - ensure it's a valid number
    if (isNaN(formData.project_status_percentage) || formData.project_status_percentage === '') {
        errors.project_status_percentage = "Must be a number";
        isValid = false;
    }

    // Validation for Project Description
    if (!formData.description.trim()) {
        errors.description = "Project Description is required";
        isValid = false;
    }

    // Validation for Remarks
    // if (!formData.remarks.trim()) {
    //     errors.remarks = "Remarks are required";
    //     isValid = false;
    // }

    // Validation for Recommendations
    // if (!formData.recommendations.trim()) {
    //     errors.recommendations = "Recommendations are required";
    //     isValid = false;
    // }

    // Validation for Contractor Details
    if (!formData.contractor_details.trim()) {
        errors.contractor_details = "Contractor Details are required";
        isValid = false;
    }

    // Validation for Start Date - ensure it's a valid date
    // Add additional logic if there are specific requirements for the start date
    if (!formData.start_date) {
        errors.start_date = "Start Date is required";
        isValid = false;
    }

    // Validation for End Date - ensure it's a valid date and after Start Date
    if (!formData.end_date) {
        errors.end_date = "End Date is required";
        isValid = false;
    } else if (new Date(formData.start_date) > new Date(formData.end_date)) {
        errors.end_date = "End Date must be after Start Date";
        isValid = false;
    }

    // Validation for Contract Sum - ensure it's a valid number
    if (isNaN(formData.contract_sum) || formData.contract_sum === '') {
        errors.contract_sum = "Contract Sum must be a number";
        isValid = false;
    }

    return { isValid, errors };
};

const validateCertandloc = (formData) => {
    let errors = {};
    let isValid = true;

    // Add validation logic for Certandloc
    formData.locations.forEach((location, index) => {
        if (!location.subcounty) {
            errors[`subcounty-${index}`] = "Subcounty is required";
            isValid = false;
        }
        if (!location.ward) {
            errors[`ward-${index}`] = "Ward is required";
            isValid = false;
        }
    });
   
    // Add other validations as needed

    return { isValid, errors };
};

export const validateFormStep = (currentStep, formData) => {
    switch (currentStep) {
        case 1:
            return validateProjectDetails(formData);
        case 2:
            return validateCertandloc(formData);
        default:
            return { isValid: true, errors: {} };
    }
};
