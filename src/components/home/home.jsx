import React, { useState, useEffect } from 'react';
import EventGallery from './eventGallery/EventGallery';
import EventModal from './eventModal/EventModal';
import { getAllDataFromCollection } from '../../firestore/firestore';
import { AppBar, Button, Dialog, Fab, IconButton, List, Slide, Toolbar, Typography, styled } from '@mui/material';
import { NewEventForm } from './NewEventForm';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';

import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import './home.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home({ auth }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getAllDataFromCollection("events")
            .then((results) => {
                const tempResultArray = []
                results.forEach((res) => {
                    tempResultArray.push({ ...res.data(), id: res.id })
                })
                setEvents(tempResultArray);
                setLoading(false);
            }).catch((err) => {
                console.error('Error fetching events:', err);
                setLoading(false);
            });

    }, []);


    const navigate = useNavigate();

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

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/login", { replace: true })
        })
    }

    return (
        <div className="App">
            <header className="Header">
                <div className="Hero" style={{ display: 'flex' }}>
                    <h1 style={{ flex: 1 }}>Events at Christ</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="logout" onClick={logout}>
                            <LogoutIcon color="action" />
                        </IconButton>
                        {/* <Button variant='contained' color='error' onClick={logout}>Logout</Button> */}
                    </div>
                    {/* <img src="https://www.bwallpaperhd.com/wp-content/uploads/2021/01/NashPoint.jpg" alt="Hero Image" /> */}
                </div>
            </header>
            {loading ? (
                <p style={{ color: 'white', fontSize: "30" }}>Loading events...</p>
            ) : (
                <>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}

                    >
                        <AppBar color="transparent" sx={{ position: 'static' }}>
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
                                    New Event
                                </Typography>

                            </Toolbar>
                        </AppBar>
                        <List style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                            <NewEventForm handleClose={handleClose} />
                        </List>
                    </Dialog>
                    <EventGallery events={events} openModal={openModal} />
                    {selectedEvent && (
                        <EventModal event={selectedEvent} closeModal={closeModal} handleOpen={handleOpen} />
                    )}
                    <Fab color="inherit" aria-label="add" style={{
                        right: 20,
                        bottom: 20,
                        position: 'fixed',
                    }} onClick={() => handleOpen()}>
                        <AddIcon />
                    </Fab>
                </>
            )}
        </div>
    );
}

