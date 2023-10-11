import React, { useState } from 'react';
import './EventModal.css';
import { Button, IconButton, Slide } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EventEditForm } from '../../event_edit_form/event_edit_form';
import { addData, deleteDocument } from '../../../firestore/firestore';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';


const style = {
    position: 'absolute',
    top: '50%',
    color: 'black',
    backgroundColor: 'red',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};





const EventModal = ({ event, closeModal, email }) => {
    const [open, setOpen] = useState(false);

    const [openM, setOpenM] = useState(false);
    const handleOpenm = () => setOpenM(true);
    const handleClosem = () => setOpenM(false);

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


    function handleSubmit() {
        handleOpenm();
        addData({
            eventName: event.eventName,
            description: event.description,
            location: event.location,
            date: event.date,
            time: event.time,
            email
        }, "bookedEvents")

        // if valid, close dialog
        handleClose();

    }

    console.log(email)

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
                        <Button variant='contained' color='success' onClick={handleSubmit}>Book Ticket</Button>
                        <Modal
                            open={openM}
                            onClose={handleClosem}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Booked!
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    The event is added to <CalendarMonthSharpIcon color="action" />
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventModal;
