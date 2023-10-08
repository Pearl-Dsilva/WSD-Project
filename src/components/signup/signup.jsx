import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@mui/material";

export default function Signup({ auth }) {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    function handleSubmit() {

        // TODO: validate data
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user created successfully")
                navigate('/', { replace: true })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    return (
        <div className="signup-page">
            <form className="signup-form">
                <label className="form-label" >Full Name:</label>
                <input className="form-input" type="text" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} placeholder="Enter your full name" />
                <label className="form-label">Email:</label>
                <input className="form-input" type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder="Enter your email" />
                <label className="form-label">Password:</label>
                <input className="form-input" type="text" value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder="Create a password" />
                <label className="form-label">Confirm Password:</label>
                <input className="form-input" type="text" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} placeholder="Confirm your password" />
                <button className="form-button" type="button" onClick={handleSubmit} >Sign Up</button>
            </form>
            <Button onClick={() => { navigate("/login", { replace: true }) }}>already have an account? Login </Button>

        </div>
    );
}