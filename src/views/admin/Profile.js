import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import config from "config";

const Profile = () => {
  const { user } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${config.backendURL}/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`

        },
        body: JSON.stringify({
          username: user.username,
          old_password: oldPassword,
          new_password: newPassword
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Password Reset Successful");
        setIsError(false);
        setOldPassword(' ')
        setNewPassword(' ')
      } else {
        setMessage(data.error || "Password Reset Failed");
        setIsError(true);
        setOldPassword(' ')
        setNewPassword(' ')
      }
    } catch (error) {
      console.error('Error', error);
    }
  }
  return (
    <>
      <UserHeader />

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt={user.username}
                        className="rounded-circle"
                        src={`https://ui-avatars.com/api/?name=${user.username.charAt(0)}&background=random&color=fff&size=128`}
                      />
                    </a>
                  </div>
                </Col>

              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      
                      
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user.username}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user.email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user.role}
                  </div>
                  <hr className="my-4" />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {message && <Alert color={isError ? "danger" : "success"}>{message}</Alert>}
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Reset Password
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Old Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="primary" onClick={handlePasswordReset}>Reset Password</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Card>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
