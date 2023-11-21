import React, { useEffect, useState } from 'react';
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
import { useAuth } from 'context/AuthContext';

export default function Messaging() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [users, setUsers] = useState([]); // Store users from the backend
  const [chats, setChats] = useState({}); // Store chats indexed by user id

  useEffect(() => {
    // Fetch users when the component mounts
    fetch('http://localhost:5000/users', {
      headers: {
        'Content-Type': 'application/json',
        // Include authorization headers if needed
      }
    })
    .then(response => response.json())
    .then(setUsers) // Assuming the backend returns an array of users
    .catch(console.error);

    // Fetch messages when the component mounts
    fetchMessages();
  }, []);

  function fetchMessages(selectChatId) {
    fetch('http://localhost:5000/messages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization headers if needed
      }
    })
    .then(response => response.json())
    .then(data => {
      // Group messages by chat
      const groupedChats = data.reduce((acc, msg) => {
        const chatId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
        acc[chatId] = acc[chatId] || [];
        acc[chatId].push(msg.body);
        return acc;
      }, {});
      setChats(groupedChats);
    })
    .catch(console.error);
  }

  const handleSendMessage = () => {
    if (activeChat) {
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
  
    fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization headers if needed
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
      // Assuming the server responds with the sent message
      // Update the local chat state to include the new message
      setChats(prevChats => {
        const updatedChats = {...prevChats};
        const messages = updatedChats[recipientId] ? [...updatedChats[recipientId]] : [];
        messages.push(sentMessage.body); // Append the new message to the array
        updatedChats[recipientId] = messages;
        return updatedChats;
      });
      // Update the active chat to show the new message
      setActiveChat(prevActiveChat => ({
        ...prevActiveChat,
        messages: [...prevActiveChat.messages, sentMessage.body]
      }));
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };
  
  

  const selectChat = (userId) => {
    const selectedUser = users.find(u => u.id === userId);
    setActiveChat({
      id: userId,
      name: selectedUser.username,
      messages: chats[userId] || []
    });
  };
  const userContainerStyle = {
    height: '400px', // Adjust as needed
    overflowY: 'scroll'
  };

  const messageContainerStyle = {
    height: '500px', // Adjust as needed
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
                <h2 className="centered-heading">Available Users</h2>
                  {users.map((user) => (
                    
                    <ListGroupItem 
                      key={user.id} 
                      className={`list-group-item-action ${user.id === activeChat?.id ? 'active' : ''}`}
                      onClick={() => selectChat(user.id)}
                    >
                      
                      <div className="py-2">
                        
                        <h5 className="h6 mb-0 username-large">{user.username}</h5>
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
              <div className="chat-box message-container">
                {activeChat && activeChat.messages.length > 0 ? (
                  activeChat.messages.map((msg, index) => (
                    <div key={index} className={`mb-3 message ${user.id === msg.sender_id ? 'sender-message' : 'receiver-message'}`}>
                      <p>{msg}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-messages">
                    <p>No chat history with this user.</p>
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
