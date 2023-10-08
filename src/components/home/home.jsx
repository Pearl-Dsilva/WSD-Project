import React, { useState, useEffect } from 'react';
import EventGallery from '../../EventGallery';
import EventModal from '../../EventModal';
import { getAllDataFromCollection } from '../../firestore/firestore';
import { AppBar, Button, Dialog, Fab, IconButton, List, Slide, Toolbar, Typography, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


import { NewEventForm } from './NewEventForm';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getAllDataFromCollection("events")
            .then((results) => {
                const tempResultArray = []
                results.forEach((res) => {
                    tempResultArray.push(res.data())
                })
                setEvents(tempResultArray);
                setLoading(false);
            }).catch((err) => {
                console.error('Error fetching events:', err);
                setLoading(false);
            });

    }, []);

    const openModal = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };


    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div className="App">
            <header className="Header">
                <div className="Hero">
                    <h1 style={{ backgroundImage: 'url()' }}>Events at Christ</h1>
                    {/* <img src="https://www.bwallpaperhd.com/wp-content/uploads/2021/01/NashPoint.jpg" alt="Hero Image" /> */}
                </div>
            </header>
            {loading ? (
                <p style={{ color: 'white' }}>Loading events...</p>
            ) : (
                <>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    Sound
                                </Typography>
                                <Button autoFocus color="inherit" onClick={handleClose}>
                                    Save Event
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <List style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                            <NewEventForm handleClose={handleClose} />
                        </List>
                    </Dialog>
                    <EventGallery events={events} openModal={openModal} />
                    {selectedEvent && (
                        <EventModal event={selectedEvent} closeModal={closeModal} />
                    )}
                    <Fab color="primary" aria-label="add" style={{
                        right: 20,
                        bottom: 20,
                        position: 'fixed'
                    }} onClick={() => handleOpen()}>
                        <AddIcon />
                    </Fab>
                </>
            )}
        </div>
    );
}

