import React from 'react';
import './EventGallery.css';
import { Widgets } from '@mui/icons-material';
import { Button } from '@mui/material';

const EventGallery = ({ events, openModal }) => {
    return (
        <div className="EventGallery">
            {events.map((event, index) => (
                <div className="EventCard" key={index}>
                    <img src={event.image} alt={event.eventName} style={{ maxHeight: '404px', maxWidth: '404px', minHeight: '404px', minWidth: '404px' }} />
                    <h2>{event.eventName}</h2>
                    <p>Date: {event.date}</p>
                    <Button variant='contained' style={{ backgroundColor: 'lightseagreen' }} onClick={() => openModal(event)}>Read More</Button>
                </div>
            ))}
        </div>
    );
};

export default EventGallery;
