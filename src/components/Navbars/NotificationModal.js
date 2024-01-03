import { Card } from 'primereact/card';
import React, { useState } from 'react';
import { 
    Modal,
    ModalHeader, 
    ModalBody, 
    ListGroup, 
    ListGroupItem, 
    Badge, 
    Input, 
    Label , 
    FormGroup 
} from "reactstrap";
import { Button } from 'primereact/button';

const NotificationModal = ({ isOpen, toggle, notifications }) => {
    const [expandedNotificationId, setExpandedNotificationId] = useState(null);
    const [readNotifications, setReadNotifications] = useState(new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]')));
    

    const handleNotificationClick = (id) => {
        setExpandedNotificationId(expandedNotificationId === id ? null : id);
        const updatedReadNotifications = new Set(readNotifications.add(id));
        setReadNotifications(updatedReadNotifications);
        localStorage.setItem('readNotifications', JSON.stringify(Array.from(updatedReadNotifications)));
    };

    const trimText = (text, length) => {
        if (typeof text !== 'string') return ''; 
        return text.length > length ? text.substring(0, length) + "..." : text;
    };
    const handleReply = (event) => {
        event.stopPropagation();
        console.log('Reply');
    }
    return (
        
        <Modal 
        isOpen={isOpen} 
        toggle={toggle}
        className="notification-modal"
         size='lg'
         backdrop="static"
         >
            <ModalHeader toggle={toggle}>Notifications</ModalHeader>
            <ModalBody>
                <ListGroup>
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                        <ListGroupItem key={notification.id} className="notification-item" onClick={() => handleNotificationClick(notification.id)}>
                            <h3 className="notification-message">
                                {notification.subject}
                                {readNotifications.has(notification.id)
                                    ? <Badge color="secondary">Read</Badge>
                                    : <Badge color="primary">New</Badge>
                                }
                            </h3>
                            {expandedNotificationId === notification.id ? (
                                <Card onClick={handleReply}>
                                     <p className="notification-details">{notification.body}</p>
                                     <div>
                                        <FormGroup>
                                            <Label>Reply</Label>
                                           <Input 
                                            type='textarea'
                                            placeholder='Reply'
                                        /> 
                                        </FormGroup>
                                        
                                        <Button className='rounded-md'>Send</Button>
                                     </div>
                                </Card>
                               
                            ) : (
                                  <p className="notification-details">{trimText(notification.details, 50)}</p>
                            )}
                        </ListGroupItem>
                    ))
                    ) :(
                        <Card>
                            <p>You have no new notifications</p>
                        </Card>
                    )}
                   
                </ListGroup>
            </ModalBody>
        </Modal>
    );
};

export default NotificationModal;
