import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SucessImage from '../../assets/img/brand/check.png'
import FailedImage from '../../assets/img/brand/cancel.png'
function CustomModal({ isOpen, toggle, title, body, onConfirm, modalType }) {
  const isSuccessful = modalType === 'success';

  // Style for success and error icons with background
  const iconStyle = {
    success: { 
      // color: 'green', 
       fontSize: '48px', 
      // backgroundColor: 'lightgreen', // Background color for visibility
      // borderRadius: '50%', // Circular background
      // padding: '10px' // Padding around the icon
    },
    error: { 
      // color: 'red', 
      // fontSize: '48px', // Increased icon size
      // backgroundColor: 'lightcoral', // Background color for visibility
      // borderRadius: '50%', // Circular background
      // padding: '10px' // Padding around the icon
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {!isSuccessful ? (
            <div style={{ textAlign: 'center' }}>
              <img src={SucessImage} alt="Sucecssful" style={{width:100}}/>
              <p>{body}</p>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={iconStyle.error}>
                <img src={FailedImage} alt='Cancel' style={{width:100}}/>
              </div>
              <p>{body}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CustomModal;
