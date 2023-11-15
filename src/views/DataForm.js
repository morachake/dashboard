import Header from 'components/Headers/Header';
import React from 'react';
import { Button, Container, Form, FormGroup, FormText, Input, Label } from 'reactstrap';

export default function DataForm() {
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Project Name
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Project Name"
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Sub-County
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                        >
                            <option>
                                Mvita
                            </option>
                            <option>
                                Likoni
                            </option>
                            <option>
                                Changamwe
                            </option>
                            <option>
                                Kisauni
                            </option>
                            <option>
                                Nyali
                            </option>
                            <option>
                                Jomvu
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Wards
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                        >
                            <option>
                                Tononoka
                            </option>
                            <option>
                                Majengo
                            </option>
                            <option>
                                Mji Wa Kale
                            </option>
                            <option>
                                Tudor
                            </option>
                            <option>
                                Shimanzi/Ganjoni
                            </option>
                        </Input>
                    </FormGroup>
                   
                    <FormGroup>
                        <Label for="exampleText">
                            Project Description 
                        </Label>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">
                            Image
                        </Label>
                        <Input
                            id="exampleFile"
                            name="file"
                            type="file"
                        />
                        <FormText>
                            Please Upload a current or recent image
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="contractSum">
                            Contract Sum
                        </Label>
                        <Input
                            id="contractSum"
                            name="contract_sum"
                            placeholder="Enter the contract sum"
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="timeFrame">
                            Time Frame
                        </Label>
                        <Input
                            id="timeFrame"
                            name="time_frame"
                            placeholder="Enter the project time frame"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="contractorDetails">
                            Contractor Details
                        </Label>
                        <Input
                            id="contractorDetails"
                            name="contractor_details"
                            placeholder="Enter the contractor's details"
                            type="text"
                        />
                    </FormGroup>
                    {/* ... Add other input fields as needed ... */}
                    <FormGroup>
                        <Label for="status">
                            Status
                        </Label>
                        <Input
                            id="status"
                            name="status"
                            placeholder="Enter the project status"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="remarks">
                            Remarks
                        </Label>
                        <Input
                            id="remarks"
                            name="remarks"
                            placeholder="Enter any remarks"
                            type="textarea"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="recommendations">
                            Recommendations
                        </Label>
                        <Input
                            id="recommendations"
                            name="recommendations"
                            placeholder="Enter any recommendations"
                            type="textarea"
                        />
                    </FormGroup>
                    {/* Assuming before_images and after_images are file uploads */}
                    <FormGroup>
                        <Label for="beforeImages">
                            Before Images
                        </Label>
                        <Input
                            id="beforeImages"
                            name="before_images"
                            type="file"
                            multiple
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="afterImages">
                            After Images
                        </Label>
                        <Input
                            id="afterImages"
                            name="after_images"
                            type="file"
                            multiple
                        />
                    </FormGroup>
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}
