import React, { useState } from 'react';
import UserHeader from 'components/Headers/UserHeader';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Input, 
  Button, 
  ListGroup, 
  ListGroupItem 
} from "reactstrap";

export default function Messaging() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    // This is dummy data for the sake of the example
    { id: 1, text: "Hey there!", sender: "John Doe" },
    { id: 2, text: "Hello! How can I help you today?", sender: "Jane Smith" },
    // Add more messages here...
  ]);

  const sendMessage = () => {
    // You would implement sending message here
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="3" lg="4" md="4" className="mb-4 mb-xl-0">
            <Card className="bg-secondary shadow">
              <CardBody className="px-0">
                <ListGroup flush>
                  {/* Map through messages and display them */}
                  {messages.map((msg) => (
                    <ListGroupItem key={msg.id} className="list-group-item-action">
                      <div className="py-2">
                        <h5 className="h6 mb-0">{msg.sender}</h5>
                        <p className="text-sm mb-0">{msg.text}</p>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="9" lg="8" md="8">
            <Card className="shadow">
              <CardBody>
                <div className="chat-box">
                  {/* Chat messages */}
                  {messages.map((msg, index) => (
                    <div key={index} className="mb-3">
                      <strong>{msg.sender}:</strong>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>
                <Row form>
                  <Col md="10">
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                    />
                  </Col>
                  <Col md="2">
                    <Button color="primary" onClick={sendMessage}>Send</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
