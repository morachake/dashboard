import React, { useState } from 'react';
import { Col, Card, CardHeader, CardBody, FormGroup, Input, Label, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';

export default function NoteTaker () {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [assignedTo, setAssignedTo] = useState('');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const handleAssignedToChange = (e) => setAssignedTo(e.currentTarget.textContent);

    return (
        <Card className="shadow">
        <CardHeader className="bg-transparent">
            <h6 className="text-uppercase text-muted ls-1 mb-1">
                Add New Note
            </h6>
        </CardHeader>
        <CardBody>
            <FormGroup>
                <Label for="assignedToDropdown">Assigned To (optional)</Label>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="w-100">
                    <DropdownToggle caret className="w-100" bsSize="lg">
                        {assignedTo}
                    </DropdownToggle>
                    <DropdownMenu className="w-100">
                        <DropdownItem onClick={handleAssignedToChange}>Person 1</DropdownItem>
                        <DropdownItem onClick={handleAssignedToChange}>Person 2</DropdownItem>
                        <DropdownItem onClick={handleAssignedToChange}>Person 3</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormGroup>
            <FormGroup>
                <Label for="noteSubject">Subject</Label>
                <Input type="text" id="noteSubject" placeholder="Enter subject" />
            </FormGroup>
            <FormGroup>
                <Label for="noteDetails">Details</Label>
                <Input
                    type="textarea"
                    id="noteDetails"
                    placeholder="Enter details"
                    style={{ height: '200px' }} // Set the height you want here
                />
            </FormGroup>
            <Button color="primary">Add Note</Button>
        </CardBody>
    </Card>
    );
};


