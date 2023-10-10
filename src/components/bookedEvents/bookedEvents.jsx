import React, { useState, useEffect } from 'react';
import { getAllDataFromCollection, getAllDataFromCollectionFiltered } from '../../firestore/firestore';
import { AppBar, Button, Dialog, Fab, IconButton, List, Slide, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import '../home/home.css';
import EventGalleryBookedEvents from './evetGalleryBookedEvents';
import EventModalBookedEvents from './eventModalBookedEvents';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Booked({ auth }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (auth?.currentUser?.email) {
            console.log("Proceed")
            getAllDataFromCollectionFiltered("bookedEvents", auth.currentUser.email)
                .then((results) => {
                    const tempResultArray = []
                    console.log(results)
                    results.forEach((res) => {
                        tempResultArray.push({ ...res.data(), id: res.id })
                    })
                    setEvents(tempResultArray);
                    setLoading(false);
                }).catch((err) => {
                    console.error('Error fetching booked events:', err);
                    setLoading(false);
                });
        }
        console.log("fired")

    }, [auth.currentUser]);


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

    const home = () => {
        navigate("/home", { replace: true })
    }
    console.log(auth)
    return (
        <div className="App">
            <header className="Header">
                <div className="Hero" style={{ display: 'flex' }}>
                    <h1 style={{ flex: 1 }}>Events at Christ</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="home" onClick={home}>
                            <HomeIcon color="action" />
                        </IconButton>
                        <IconButton aria-label="logout" onClick={logout}>
                            <LogoutIcon color="action" />
                        </IconButton>
                    </div>
                </div>
            </header>
            {loading ? (
                <p style={{ color: 'white', fontSize: "30" }}>Loading events...</p>
            ) : (
                <>
                    <EventGalleryBookedEvents events={events} openModal={openModal} />
                    {selectedEvent && (
                        <EventModalBookedEvents event={selectedEvent} closeModal={closeModal} handleOpen={handleOpen} />
                    )}
                </>
            )}
        </div>
    );
}

