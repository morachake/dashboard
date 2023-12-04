import React, { useState } from 'react';
import { FormGroup,Label, Input ,FormFeedback} from 'reactstrap';
export default function ValidatedInput({
    label,
    name,
    value,
    type,
    validator,
    onChange
}) {
    const [touched,setTouched] = useState(false)
    const [error,setError] = useState('')
    const handleChange = (event) =>{
         if(!touched) setTouched(true)
         onChange(event)
    
         const validationError = validator(event.target.value)
         setError(validationError)
    }
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
        {touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}
