import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
} from 'reactstrap';

const ResetPass = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState('');
   const {resetPassword} = useAuth()
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(oldPassword, newPassword);
      setAlert({ message: 'Password reset successfully.', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Failed to reset password.', type: 'danger' });
    }
  };
  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-3">
            {/* <small>Reset Password</small> */}
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          {alert.message && (
            <Alert color={alert.type}>
              {alert.message}
            </Alert>
          )}
          <Form role="form" onSubmit={handleResetPassword}>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button
                className="my-4"
                color="primary"
                type="submit"
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ResetPass;
