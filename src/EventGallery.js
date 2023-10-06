import React from 'react';
import './EventGallery.css';

const EventGallery = ({ events, openModal }) => {
    return (
        <div className="EventGallery">
            {events.map((event, index) => (
                <div className="EventCard" key={index}>
                    <img src={event.image} alt={event.eventName} />
                    <h2>{event.eventName}</h2>
                    <p>Date: {event.date}</p>
                    <button onClick={() => openModal(event)}>Read More</button>
                </div>
            ))}
        </div>
    );
};

export default EventGallery;
