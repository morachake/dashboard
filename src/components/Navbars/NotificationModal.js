import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ListGroup,
    ListGroupItem
} from "reactstrap";

const NotificationModal = ({ isOpen, toggle }) => {
    const [expandedNotificationId, setExpandedNotificationId] = useState(null);

    const handleNotificationClick = (id) => {
        setExpandedNotificationId(expandedNotificationId === id ? null : id);
    };

    // Function to trim text
    const trimText = (text, length) => {
        if (typeof text !== 'string') return ''; // Handle undefined or non-string text
        return text.length > length ? text.substring(0, length) + "..." : text;
    };


    const notifications = [
        { id: 1, message: 'New user registered.Scheduled maintenance will occur at 3AM server time.' },
        { id: 2, message: 'Likoni water project update 3AM.Scheduled maintenance will occur at 3AM server time.' },
        { id: 3, message: 'A new project was added Scheduled maintenance will occur at 3AM server time.' },
        { id: 4, message: 'The Secretary added a new update' },
        { id: 5, message: 'You have a new notofication comin in' },
        { id: 6, message: 'The likoni tower Water project is complete' },
        { id: 7, message: 'New version of the app is available.' },
    ];
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="notification-modal">
            <ModalHeader toggle={toggle}>Notifications</ModalHeader>
            <ModalBody>
                <ListGroup>
                    {notifications.map(notification => (
                        <ListGroupItem key={notification.id} className="notification-item" onClick={() => handleNotificationClick(notification.id)}>
                            <div className="notification-message">
                                {notification.message}
                            </div>
                            {expandedNotificationId === notification.id
                                ? <div className="notification-details">{notification.details}</div>
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
