import React, { useState } from 'react';

import dayjs from 'dayjs';
import "./home.css"

import { Button, Typography, styled } from '@mui/material';
import { Input, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { isValidDate, isValidName, isValidTimeRange } from '../../misc/validation';
import { addData } from '../../firestore/firestore';

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export function NewEventForm({ handleClose }) {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState(dayjs(`${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`));
    const [eventImage, setEventImage] = useState('');
    const [eventLocation, setEventLocation] = useState("");
    const [eventTimeStart, setEventTimeStart] = useState(dayjs(`2022-04-17T${new Date().getHours()}:${new Date().getMinutes()}`));
    const [eventTimeEnd, setEventTimeEnd] = useState(dayjs(`2022-04-17T${new Date().getHours()}:${new Date().getMinutes()}`));
    const [errorState, setErrorState] = useState({
        error: false,
        reason: ''
    });


    function handleSubmit() {
        // validate data
        if (!isValidName(eventName)) {
            setErrorState({
                error: true,
                reason: 'Invalid Name'
            });
            return;
        }
        if (!isValidName(eventDescription)) {
            setErrorState({
                error: true,
                reason: 'Invalid Description'
            });
            return;
        }
        if (!isValidName(eventLocation)) {
            setErrorState({
                error: true,
                reason: 'Invalid Location'
            });
            return;
        }

        if (!eventDate.toDate().toLocaleDateString()) {
            setErrorState({
                error: true,
                reason: 'Invalid Date'
            });
            return;
        }


        if (!isValidDate(eventDate.toDate().toLocaleDateString)) {
            setErrorState({
                error: true,
                reason: 'Date must be ahead of current date'
            });
            return;
        }

        if (!isValidTimeRange(eventTimeStart, eventTimeEnd)) {
            setErrorState({
                error: true,
                reason: 'Invalid Time'
            });
            return;
        }




        //push to database
        addData({
            eventName: eventName,
            description: eventDescription,
            image: eventImage === '' ? "https://via.placeholder.com/404" : eventImage,
            location: eventLocation,
            date: eventDate.toDate().toLocaleDateString('en-CA').replace('/', '-').replace('/', '-'),
            time: `${eventTimeStart.toDate().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })} - ${eventTimeEnd.toDate().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })}`
        }, "events")

        // if valid, close dialog
        handleClose();

        // else show error
    }

    return (
        <>
            <Typography>
                Event Name
            </Typography>
            <Input placeholder="Spring Time"
                variant='outlined'
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                autoFocus={true} />

            {
                errorState.error && errorState.reason == "Invalid Name" ?
                    <Typography color="red">
                        Invalid Name
                    </Typography> : null
            }

            <hr />


            <Typography>
                Description
            </Typography>
            <Textarea
                minRows={2}
                maxRows={3}
                placeholder="Description..."
                size="md"
                sx={{
                    '--Textarea-focusedInset': 'var(--any, )',
                    '--Textarea-focusedThickness': '0.25rem',
                    '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
                    '&::before': {
                        transition: 'box-shadow .15s ease-in-out',
                    },
                    '&:focus-within': {
                        borderColor: '#86b7fe',
                    },
                }}
                value={eventDescription}
                onChange={(event) => setEventDescription(event.target.value)} />
            {
                errorState.error && errorState.reason == "Invalid Description" ?
                    <Typography color="red">
                        Invalid Description
                    </Typography> : null
            }
            <hr />

            <Typography>
                Event Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    value={eventDate}
                    onChange={(newValue) => setEventDate(newValue)} />
            </LocalizationProvider>
            {
                errorState.error && errorState.reason == "Invalid Date" ?
                    <Typography color="red">
                        Invalid Date
                    </Typography> : null
            }
            <hr />


            <Typography>
                Event Image
            </Typography>

            {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={(event) => console.log(event.target.files[0])}>
                Upload file
                <VisuallyHiddenInput type="file" accept="image/jpeg,image/png,image/gif" />
            </Button> */}
            <Input placeholder="Image URL"
                variant='outlined'
                value={eventImage}
                onChange={(event) => setEventImage(event.target.value)} />
            <hr />


            <Typography>
                Event Location
            </Typography>
            <Input placeholder="Central Block 813"
                variant='outlined'
                value={eventLocation}
                onChange={(event) => setEventLocation(event.target.value)} />
            {
                errorState.error && errorState.reason == "Invalid Location" ?
                    <Typography color="red">
                        Invalid Location
                    </Typography> : null
            }
            <hr />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography>
                    Event Time
                </Typography>

                <TimePicker label="Start Time" value={eventTimeStart} onChange={(event) => {
                    setEventTimeStart(event);
                }} />
                <TimePicker label="End Time" value={eventTimeEnd} onChange={(event) => setEventTimeEnd(event)} />
                {
                    errorState.error && errorState.reason == "Invalid Time" ?
                        <Typography color="red">
                            Invalid Start or End Time
                        </Typography> : null
                }
                <hr />

            </LocalizationProvider>
            <Button variant='contained' color='inherit' onClick={handleSubmit}>
                Save Event
            </Button>
        </>
    );
}
