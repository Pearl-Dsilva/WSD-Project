import React from 'react';
import './evetGalleryBookedEvents.css';
import { Button } from '@mui/material';

const EventGalleryBookedEvents = ({ events, openModal }) => {
    // console.log(events)
    return (
        <div className="EventGallery">
            {events.map((event, index) => (
                <div className="EventCard" key={index}>
                    <h2>{event.eventName}</h2>
                    <p>Date: {event.date}</p>
                    <Button variant='contained' style={{ backgroundColor: 'lightseagreen' }} onClick={() => openModal(event)}>Read More</Button>
                </div>
            ))}
        </div>
    );
};

export default EventGalleryBookedEvents;
