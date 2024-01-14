import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem, Card,CardTitle,CardBody,CardFooter } from "reactstrap";

const NotificationModal = ({ isOpen, toggle, notifications }) => {
    const [expandedNotificationId, setExpandedNotificationId] = useState(null);
    const [readNotifications, setReadNotifications] = useState(new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]')));

    useEffect(() => {
        if (isOpen) {
            const allNotificationIds = new Set(notifications.map(notification => notification.id));
            setReadNotifications(allNotificationIds);
            localStorage.setItem('readNotifications', JSON.stringify(Array.from(allNotificationIds)));
        }
    }, [isOpen, notifications]);

    const handleNotificationClick = (id) => {
        setExpandedNotificationId(expandedNotificationId === id ? null : id);
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
            size='md'
            backdrop="static"
        >
            <ModalHeader toggle={toggle}>Notifications</ModalHeader>
            <ModalBody>
                <ListGroup>
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <ListGroupItem key={notification.id} className="notification-item" onClick={() => handleNotificationClick(notification.id)}>
                                <h3 className="notification-message">
                                    
                                </h3>                   
                                    <Card>
                                        <CardBody className="notification-details">{notification.message}</CardBody>     
                                        <CardFooter><small>{formatDate(notification.timestamp)}</small></CardFooter>   
                                    </Card>
 
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
