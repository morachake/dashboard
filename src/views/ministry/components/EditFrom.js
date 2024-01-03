import React, { useState } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Label, 
    Input 
} from 'reactstrap';

function EditForm({toggle ,args ,modal}) {
//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

  return (
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Certficate number">Cerfificate Number</Label>
            <Input type="number"  id="certno" placeholder="Certificate Number" />
          </FormGroup>
          <FormGroup>
            <Label for="Amount">Amount</Label>
            <Input type="number" name="amount" placeholder="Amount " />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
  );
}

export default EditForm;