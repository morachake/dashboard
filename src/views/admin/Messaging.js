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
  const [selectedFile, setSelectedFile] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchProjects();
    fetchRemarks();
  }, []);

  const fetchProjects = () => {
    fetch(`${config.backendURL}/forms`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => setProjects(data))
    .catch(error => console.error('Error fetching projects:', error));
  };

  const fetchRemarks = () => {
    fetch(`${config.backendURL}/get_remarks`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => setRemarks(data))
    .catch(console.error);
  };

const handleSendMessage = () => {
  if (activeChat && message.trim()) {
    // Prepare the new remark
    const newRemark = {
      form_id: activeChat.id,
      text: message,
      // Additional fields based on your remark structure (e.g., user details)
      user_id: user.id,
      timestamp: new Date().toISOString(),
      file_url: selectedFile ? URL.createObjectURL(selectedFile) : null
    };

    // Optimistically update the chat with the new remark
    setActiveChat(prevActiveChat => ({
      ...prevActiveChat,
      messages: [...prevActiveChat.messages, newRemark]
    }));

    // Send the remark to the server
    addRemark(activeChat.id, message, selectedFile);
    setMessage('');
    setSelectedFile(null);
  }
};

const addRemark = (formId, remarkText, file) => {
  const formData = new FormData();
  formData.append('form_id', formId);
  formData.append('remark', remarkText);
  if (file) {
    formData.append('file', file);
  }
  fetch(`${config.backendURL}/remarks`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(newRemarkFromServer => {
    setActiveChat(prevActiveChat => {
      const updatedMessages = prevActiveChat.messages.map(msg =>
        msg.timestamp === newRemarkFromServer.timestamp ? newRemarkFromServer : msg
      );
      return { ...prevActiveChat, messages: updatedMessages };
    });
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
};

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
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

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="3" lg="4" md="4">
            <Card className="bg-secondary shadow">
              <CardBody className="px-0 user-container" style={{ height: '400px', overflowY: 'scroll' }}>
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
                <div className="chat-box message-container" style={{ height: '500px', overflowY: 'scroll' }}>
                  {activeChat && activeChat.messages.length > 0 ? (
                    activeChat.messages.map((remark, index) => (
                      <div key={index} className={`message ${remark.user_id === user.id ? 'sender-message' : 'receiver-message'}`}>
                        {remark.user_id !== user.id &&
                          <span className='username'>{remark.user}</span>
                        }
                        <>
                         {remark.file_url && (
                          <Card>
                            <CardBody>
                              <img
                                src={remark.file_url}
                                alt={remark.text}
                                style={{ width: '200px', height: '150px' }}
                              />
                            </CardBody>
                          </Card>
                         )}
                        </>
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
                  <Row form className="align-items-center my-form-row">
                    <Col md="7">
                      <Input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Message ${activeChat.name}...`}
                        className="custom-text-input"
                      />
                    </Col>
                    <Col md="2">
                      <label htmlFor="fileUpload" className="custom-file-upload btn btn-primary btn-sm">
                        <i className="ni ni-cloud-upload-96 upload-icon" />
                        <input
                          type="file"
                          id="fileUpload"
                          accept=".pdf, image/*"
                          style={{ display: 'none' }}
                          onChange={handleFileUpload}
                        />
                      </label>
                    </Col>
                    <Col md="3">
                      <Button color="primary" size="sm" onClick={handleSendMessage} className="custom-send-button">
                        Send
                      </Button>
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
