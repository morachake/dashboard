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

    console.log(notifications)

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Formats the date and time according to the local setting
    };

    const trimText = (text, length) => {
        if (typeof text !== 'string') return ''; 
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const handleReply = (event) => {
        event.stopPropagation();
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
                    {notifications.filter(notification => !readNotifications.has(notification.id)).length > 0 ? (
                        notifications.filter(notification => !readNotifications.has(notification.id))
                        .map(notification => (
                            <ListGroupItem key={notification.id} className="notification-item" onClick={() => handleNotificationClick(notification.id)}>
                                <h3 className="notification-message">
                                    {notification.subject}
                                    <Badge color="primary">New</Badge>
                                </h3>
                                {expandedNotificationId === notification.id && (
                                    <Card onClick={handleReply}>
                                        <p className="notification-details">{notification.message}</p> 
                                        <p className="notification-details">{trimText(notification.type, 50)}</p>
                                        <p>{formatDate(notification.timestamp)}</p>     
                                    </Card>
                                )}
                            </ListGroupItem>
                        ))
                    ) : (
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
