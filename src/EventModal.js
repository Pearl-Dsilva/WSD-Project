import React from 'react';
import './EventModal.css';

const EventModal = ({ event, closeModal }) => {
    return (
        <div className="EventModal">
            <div className="ModalContent">
                <img src={event.image} alt={event.eventName} />
                <h2>{event.eventName}</h2>
                <p>Date: {event.date}</p>
                <p>Description: {event.description}</p>
                <p>Ticket Price: {event.ticketPrice}</p>
                <p>Location: {event.location}</p>
                <button onClick={closeModal}>Close</button>
                <button>Book Ticket</button>
            </div>
        </div>
    );
};

export default EventModal;
