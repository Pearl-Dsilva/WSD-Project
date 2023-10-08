import "./signup.css";

export default function Signup() {

    return (
        <div className="signup-page">
            <form className="signup-form">
                <label className="form-label">Full Name:</label>
                <input className="form-input" type="text" placeholder="Enter your full name" />
                <label className="form-label">Email:</label>
                <input className="form-input" type="email" placeholder="Enter your email" />
                <label className="form-label">Password:</label>
                <input className="form-input" type="password" placeholder="Create a password" />
                <label className="form-label">Confirm Password:</label>
                <input className="form-input" type="password" placeholder="Confirm your password" />
                <button className="form-button" type="submit">Sign Up</button>
            </form>
        </div>
    );
}