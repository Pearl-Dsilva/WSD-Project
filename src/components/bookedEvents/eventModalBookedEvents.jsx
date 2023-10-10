import React, { useState } from 'react';
import '../home/eventModal/EventModal.css';
import { Button, IconButton, Slide } from '@mui/material';
// import { addData, deleteDocument } from '../../../firestore/firestore';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EventModalBookedEvents = ({ event, closeModal }) => {
    const [open, setOpen] = useState(false);
    const [updateData, setUpdatedData] = useState(event)



    return (
        <>

            {/* <EventEditForm open={open} handleClose={handleClose} event={event} /> */}
            <div className="EventModalBookedEvents">
                <div className="ModalContent">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    </div>
                    <h2>{event.eventName}</h2>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <p> <strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                    </div>
                    <p> <strong>Description:</strong> {event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Button variant='contained' color='error' onClick={closeModal}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventModalBookedEvents;
