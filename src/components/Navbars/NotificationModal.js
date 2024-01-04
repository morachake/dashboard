import { Card } from 'primereact/card';
import React, { useState } from 'react';
import { 
    Modal,
    ModalHeader, 
    ModalBody, 
    ListGroup, 
    ListGroupItem, 
    Badge,
} from "reactstrap";

const NotificationModal = ({ isOpen, toggle, notifications }) => {
    const [expandedNotificationId, setExpandedNotificationId] = useState(null);
    const [readNotifications, setReadNotifications] = useState(new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]')));

    const handleNotificationClick = (id) => {
        setExpandedNotificationId(expandedNotificationId === id ? null : id);
        const updatedReadNotifications = new Set(readNotifications.add(id));
        setReadNotifications(updatedReadNotifications);
        localStorage.setItem('readNotifications', JSON.stringify(Array.from(updatedReadNotifications)));
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); 
    };
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
                                {expandedNotificationId === notification.id && (
                                    < >
                                        <p className="notification-details">{notification.message}</p>      
                                        <p>{formatDate(notification.timestamp)}</p>
                                    </>
                                )}
                            </ListGroupItem>
                        ))
                    ) : (
                        <Card>
                            <p>You have no notifications</p>
                        </Card>
                    )}
                </ListGroup>
            </ModalBody>
        </Modal>
    );
};

export default NotificationModal;
