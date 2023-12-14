import React, { useEffect, useState } from 'react';
import UserHeader from 'components/Headers/UserHeader';
import { Container, Row, Col, Card, CardBody, Input, Button, ListGroup, ListGroupItem } from "reactstrap";
import { useAuth } from 'context/AuthContext';
import config from 'config';

export default function Messaging() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    fetch(`${config.backendURL}/forms`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  function fetchRemarks() {
    fetch(`${config.backendURL}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        const groupedChats = data.reduce((acc, msg) => {
          if (msg.sender_id === user.id || msg.recipient_id === user.id) {
            const chatId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
            acc[chatId] = acc[chatId] || [];
            acc[chatId].push(msg);
          }
          return acc;
        }, {});
        setChats(groupedChats);
      })
      .catch(console.error);
  }
  
  const handleSendMessage = () => {
    if (activeChat && message.trim()) {
      sendMessage(user.id, activeChat.id, message);
      setMessage('');
    }
  };

  const sendMessage = (senderId, recipientId, messageBody) => {
    const messageData = {
      sender_id: senderId,
      recipient_id: recipientId,
      body: messageBody,
    };

    fetch(`${config.backendURL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(sentMessage => {
        setChats(prevChats => {
          const updatedChats = { ...prevChats };
          const messages = updatedChats[recipientId] ? [...updatedChats[recipientId]] : [];
          messages.push(sentMessage);
          updatedChats[recipientId] = messages;
          return updatedChats;
        });
        setActiveChat(prevActiveChat => ({
          ...prevActiveChat,
          messages: [...(prevActiveChat?.messages || []), sentMessage]
        }));
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const selectChat = (projectId) => {
    const selectedProject = projects.find(project => project.id === projectId);
    setActiveChat({
      id: projectId,
      name: selectedProject.project_name,
      messages: chats[projectId] || []
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
              <CardBody className="px-0 user-container" >
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
                    activeChat.messages.map((msg, index) => (
                      <div key={index} className={`mb-3 message ${user.id === msg.sender_id ? 'sender-message' : 'receiver-message'}`}>
                        <p>{msg.body}</p>
                      </div>
                    ))
                  ) : (
                    <div className="no-messages">
                      <p>No chat history with this project.</p>
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
