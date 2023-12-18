// ValidatedInput.js
import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import debounce from 'lodash/debounce';

export default function ValidatedInput({
    label,
    name,
    value,
    type,
    validator,
    onChange,
    onValidationStateChange,
}) {
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');

    const handleValidation = (inputValue) => {
        const validationError = validator(inputValue);
        setError(validationError);

        if (onValidationStateChange) {
            onValidationStateChange(name, !validationError);
        }
    };

    const debouncedValidation = debounce(handleValidation, 300);

    const handleChange = (event) => {
        if (!touched) setTouched(true);
        onChange(event);
        debouncedValidation(event.target.value);
    };

    useEffect(() => {
        return () => {
            debouncedValidation.cancel();
        };
    }, [debouncedValidation]);

    const getErrorMessage = () => {
        switch (error) {
            case 'required':
                return 'This field is required';
            case 'number':
                return 'Please enter a valid number';
            default:
                return error;
        }
    };

    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                invalid={touched && !!error}
                onBlur={() => setTouched(true)}
            />
            {touched && error && <FormFeedback>{getErrorMessage()}</FormFeedback>}
        </FormGroup>
    );
}
