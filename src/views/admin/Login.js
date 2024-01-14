
// reactstrap components
import { useAuth } from "context/AuthContext";
import { useState } from "react";
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
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [buttonText,setButtonText] = useState('Sign in');
  const {login} = useAuth()
  const toggleShowPassword = () =>{
    setShowPassword(!showPassword)
  }
  const handleLogin = async () => {
    setLoading(true);
    setButtonText('Loading...');
    setTimeout(() => setButtonText('Please Wait ....'),1500)

    await new Promise(resolve => setTimeout(resolve, 3000))
    try{
      const result = await login(username, password); 
        setLoading(false);
        if (result.error) {
          setError(result.error);
        } else {
          setError("")
        }
    } catch (error){
      setError("An Error occured")
    } finally{
      setLoading(false);
      setButtonText("Sign In");
    }
  
  };
  console.log("an arror occured: ",error);
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
             {error && <div className="text-center text-danger mb-3">{error}</div>} {/* Display error message */}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="test"
                    value={username}
                    // autoComplete="new-email"
                    onChange={(e) => setUsername(e.target.value)}
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
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                 <InputGroupAddon addonType="append">
                <InputGroupText onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
                  <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
                </InputGroupText>
              </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={ handleLogin}>
                  {loading ? buttonText: 'Sign in'}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
