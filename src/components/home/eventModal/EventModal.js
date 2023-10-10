import React, { useState } from 'react';
import './EventModal.css';
import { Button, IconButton, Slide } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EventEditForm } from '../../event_edit_form/event_edit_form';
import { deleteDocument } from '../../../firestore/firestore';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EventModal = ({ event, closeModal }) => {
    const [open, setOpen] = useState(false);
    const [updateData, setUpdatedData] = useState(event)



    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }


    const handleDelete = () => {
        deleteDocument(event.id)
        closeModal()
    }

    return (
        <>

            <EventEditForm open={open} handleClose={handleClose} event={event} />
            <div className="EventModal">
                <div className="ModalContent">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton aria-label="delete" onClick={() => handleDelete()}>
                            <DeleteIcon color='error' />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => handleOpen()}>
                            <EditIcon color='primary' />
                        </IconButton>
                    </div>
                    <img src={event.image} alt={event.eventName} style={{ maxHeight: '404px', maxWidth: '404px', minHeight: '404px', minWidth: '404px' }} />
                    <h2>{event.eventName}</h2>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <p> <strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                    </div>
                    <p> <strong>Description:</strong> {event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Button variant='contained' color='error' onClick={closeModal}>Close</Button>
                        <Button variant='contained' color='success' >Book Ticket</Button>
                        {/* TODO:button to pay */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventModal;
