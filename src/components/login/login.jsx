import "./login.css";

export default function Login() {

    return (
        <div className="login-page">
            <form className="login-form">
                <label className="form-label">Email:</label>
                <input className="form-input" type="email" placeholder="Enter your email" />
                <label className="form-label">Password:</label>
                <input className="form-input" type="password" placeholder="Enter your password" />
                <button className="form-button" type="submit">Login</button>
            </form>
        </div>
    );
}