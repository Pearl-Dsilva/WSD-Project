import React, { useState, useEffect } from 'react';
import EventGallery from '../../EventGallery';
import EventModal from '../../EventModal';
import { addData } from '../../firestore/firestore';


export default function Home() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('events.json'); // Replace with your API endpoint or JSON file URL
                const data = await response.json();
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        // addData({
        //   first: "Kenneth",
        //   last: "Fernandes",
        //   born: 2001
        // });
        fetchEvents();
    }, []);

    const openModal = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="App">
            <header className="Header">
                <div className="Hero">
                    <h1>Events at Christ</h1>
                    {/* <img src="https://www.bwallpaperhd.com/wp-content/uploads/2021/01/NashPoint.jpg" alt="Hero Image" /> */}
                </div>
            </header>
            {loading ? (
                <p>Loading events...</p>
            ) : (
                <>
                    <EventGallery events={events} openModal={openModal} />
                    {selectedEvent && (
                        <EventModal event={selectedEvent} closeModal={closeModal} />
                    )}
                </>
            )}
        </div>
    );
}