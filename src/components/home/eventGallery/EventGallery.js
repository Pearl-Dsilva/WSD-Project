import React from 'react';
import './EventGallery.css';
import { Button } from '@mui/material';

const EventGallery = ({ events, openModal }) => {
    console.log(events)
    return (
        <div className="EventGallery">
            {events.map((event, index) => (
                <div className="EventCard" key={index}>
                    <img src={event.image} alt={event.eventName} style={{ maxHeight: '450px', minHeight: "420px", maxWidth: '400px', position: 'relative' }} />
                    <h2>{event.eventName}</h2>
                    <p>Date: {event.date}</p>
                    <Button variant='contained' style={{ backgroundColor: 'lightseagreen' }} onClick={() => openModal(event)}>Read More</Button>
                </div>
            ))}
        </div>
    );
};

export default EventGallery;
