import { useState } from "react";
import { isValidEmail, isValidPassword } from "../../misc/validation";
import "./login.css";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ auth }) {
    const [open, setOpen] = useState({ error: false, message: "" });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    function onSubmit() {
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
        console.log("reched hereeee")
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(userCredential)
                navigate('/', { replace: true })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                if (errorCode === "auth/invalid-login-credentials") {
                    handleOpen(
                        "Invalid Credentials"
                    )
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

            <div className="login-page">
                <form className="login-form">
                    <label className="form-label">Email:</label>
                    <input className="form-input" type="email" placeholder="Enter your email" onChange={(event) => { setEmail(event.target.value) }}
                        value={email} />
                    <label className="form-label">Password:</label>
                    <input className="form-input" type="password" placeholder="Enter your password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    <button className="form-button" type="button" onClick={onSubmit}>Login</button>
                </form>
                <Button onClick={() => { navigate("/signup", { replace: true }) }}>Don't have an account? Create account</Button>
            </div>
        </>
    );
}