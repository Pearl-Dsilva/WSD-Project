import React from 'react';
import './EventModal.css';
import { Button } from '@mui/material';

const EventModal = ({ event, closeModal }) => {
    return (
        <div className="EventModal">
            <div className="ModalContent">
                <img src={event.image} alt={event.eventName} style={{ maxHeight: '404px', maxWidth: '404px', minHeight: '404px', minWidth: '404px' }} />
                <h2>{event.eventName}</h2>
                <p>Date: {event.date}</p>
                <p>Description: {event.description}</p>
                <p>Ticket Price: {event.ticketPrice}</p>
                <p>Location: {event.location}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button variant='contained' color='error' onClick={closeModal}>Close</Button>
                    <Button variant='contained' color='success'>Book Ticket</Button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
