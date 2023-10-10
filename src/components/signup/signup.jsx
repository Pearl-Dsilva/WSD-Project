import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { isPasswordMatch, isValidEmail, isValidPassword } from "../../misc/validation";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Signup({ auth }) {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [open, setOpen] = useState({ error: false, message: "" });


    const navigate = useNavigate()

    function handleSubmit() {

        const emailValidation = isValidEmail(email)
        if (!emailValidation) {
            handleOpen("Invalid Email")
            return;
        }

        const passwordValidation = isValidPassword(password)
        if (!passwordValidation.result) {
            handleOpen(passwordValidation.message)
            return;
        }
        const cofirmPasswordValidation = isValidPassword(confirmPassword)
        if (!cofirmPasswordValidation.result) {
            handleOpen(cofirmPasswordValidation.message)
            return;
        }

        const passwordMatch = isPasswordMatch(password, confirmPassword)
        if (!passwordMatch.result) {
            handleOpen(passwordMatch.message)
            return;
        }
        // console.log("reched hereeee")

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User created successfully")
                // navigate('/', { replace: true })
                navigate('/home', { replace: true })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                if (errorCode === "auth/invalid-login-credentials") {
                    handleOpen("Invalid Credentials")
                    return
                }
                if (errorCode === "auth/email-already-in-use") {
                    handleOpen("Email already exists. Try to Login")
                    return
                }
            });
    }



    function handleClose() {
        setOpen({ error: false, message: "" });
    }
    function handleOpen(message) {
        setOpen({ error: true, message });
    }

    return (
        <>
            <Dialog
                open={open.error}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"ALERT!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {open.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>


            <div className="signup-page">
                <form className="signup-form">
                    <label className="form-label" >Full Name:</label>
                    <input className="form-input" type="text" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} placeholder="Enter your full name" />
                    <label className="form-label">Email:</label>
                    <input className="form-input" type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder="Enter your email" />
                    <label className="form-label">Password:</label>
                    <input className="form-input" type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder="Create a password" />
                    <label className="form-label">Confirm Password:</label>
                    <input className="form-input" type="password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} placeholder="Confirm your password" />
                    <button className="form-button" type="button" onClick={handleSubmit} >Sign Up</button>
                </form>
                <Button onClick={() => { navigate("/login", { replace: true }) }}>already have an account? Login </Button>

            </div>
        </>
    );
}