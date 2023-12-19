// ValidatedInput.js
import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default function ValidatedInput({
    label,
    name,
    type,
    value,
    onChange,
    error
}) {
    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                invalid={!!error}
            />
            {error && <FormFeedback>{error}</FormFeedback>}
        </FormGroup>
    );
}
