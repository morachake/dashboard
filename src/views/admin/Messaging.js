import React, { useEffect, useState } from 'react';
import UserHeader from 'components/Headers/UserHeader';
import { Container, Row, Col, Card, CardBody, Input, Button, ListGroup, ListGroupItem } from "reactstrap";
import { useAuth } from 'context/AuthContext';
import config from 'config';

export default function Messaging() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [projects, setProjects] = useState([]);
  const [remarks, setRemarks] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    fetch(`${config.backendURL}/forms`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
    .then(data => setProjects(data))
    .catch(error => console.error('Error fetching projects:', error));

    fetchRemarks();
  }, []);

  function fetchRemarks() {
    fetch(`${config.backendURL}/get_remarks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => setRemarks(data)) 
    .catch(console.error);
  }

  const handleSendMessage = () => {
    if (activeChat && message.trim()) {
      addRemark(activeChat.id, message);
      setMessage('');
    }
  };
const addRemark = (formId, remarkText) => {
  const remarkData = {
    form_id: formId,
    remark: remarkText,
    user_id: user.id,
    // Assuming you need a timestamp for the new remark
    timestamp: new Date().toISOString()
  };

  // Optimistically update the active chat with the new message
  if (activeChat && activeChat.id === formId) {
    const newMessage = {
      ...remarkData,
      user: user.id,
      text: remarkText
    };
    setActiveChat(prevActiveChat => ({
      ...prevActiveChat,
      messages: [...prevActiveChat.messages, newMessage]
    }));
  }

  fetch(`${config.backendURL}/remarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(remarkData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(newRemark => {
    setRemarks(prevRemarks => [...prevRemarks, newRemark]);
  })
  .catch(error => {
    console.error('Error sending message:', error);
    // Handle error by possibly removing the optimistic update
  });
};


  const selectChat = (projectId) => {
    const selectedProject = projects.find(project => project.id === projectId);
    const projectRemarks = remarks.filter(remark => remark.form_id === projectId);
    setActiveChat({
      id: projectId,
      name: selectedProject.project_name,
      messages: projectRemarks
    });
  };

  const userContainerStyle = {
     height: '400px',
    overflowY: 'scroll'
  };

  const messageContainerStyle = {
   height: '500px',
   overflowY: 'scroll'
  };
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="3" lg="4" md="4" className="mb-4 mb-xl-0">
            <Card className="bg-secondary shadow">
              <CardBody className="px-0 user-container" style={userContainerStyle}>
                <ListGroup flush>
                  <h2 className="centered-heading">Available Projects</h2>
                  {projects.map((project) => (
                    <ListGroupItem
                      key={project.id}
                      className={`list-group-item-action ${project.id === activeChat?.id ? 'active' : ''}`}
                      onClick={() => selectChat(project.id)}
                    >
                      <div className="py-2">
                        <h5 className="h6 mb-0 username-large">{project.project_name}</h5>
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
               <div className="chat-box message-container" style={messageContainerStyle}>
                    {activeChat && activeChat.messages.length > 0 ? (
                      activeChat.messages.map((remark, index) => (
                       <div key={index} className={`message ${remark.user_id === user.id ? 'sender-message' : 'receiver-message'}`}>
                          {remark.user_id !== user.id &&
                           <span className='username'>{remark.user}</span>
                          }
                          <p className='message-text'>{remark.text}</p>
                          <small className='timestamp'>{new Date(remark.timestamp).toLocaleString()}</small>
                        </div>
                      ))
                    ) : (
                      <div className="no-messages">
                        <p>Please select a project to add a remark</p>
                      </div>
                    )}
                  </div>


                {activeChat && (
                  <Row form>
                    <Col md="10">
                      <Input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Message ${activeChat.name}...`}
                      />
                    </Col>
                    <Col md="2">
                      <Button color="primary" onClick={handleSendMessage}>Send</Button>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
