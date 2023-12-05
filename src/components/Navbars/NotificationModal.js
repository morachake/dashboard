import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem, Badge } from "reactstrap";
import config from 'config';

const NotificationModal = ({ isOpen, toggle }) => {
    const [expandedNotificationId, setExpandedNotificationId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState(new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]')));
    useEffect(() => {
        fetch(`${config.backendURL}/notes`)
            .then(response => response.json())  
            .then(data => {
                const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setNotifications(sortedData);
            });
    }, []);

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

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="notification-modal" size='lg'>
            <ModalHeader toggle={toggle}>Notifications</ModalHeader>
            <ModalBody>
                <ListGroup>
                    {notifications.map(notification => (
                        <ListGroupItem key={notification.id} className="notification-item" onClick={() => handleNotificationClick(notification.id)}>
                            <div className="notification-message">
                                {notification.subject}
                                {readNotifications.has(notification.id)
                                    ? <Badge color="secondary">Read</Badge>
                                    : <Badge color="primary">New</Badge>
                                }
                            </div>
                            {expandedNotificationId === notification.id
                                ? <div className="notification-details">{notification.body}</div>
                                : <div className="notification-details">{trimText(notification.details, 50)}</div>
                            }
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </ModalBody>
        </Modal>
    );
};

export default NotificationModal;
