import React from 'react';
import './landing.css'; // Import your CSS file
import logo from './images/logo.jpg';
import bgimage from './images/bgimage.png';
import WhatsApp from './images/WhatsApp.png';
import Facebook from './images/Facebook.png';
import Twitter from './images/TwitterX.png';
import Email from './images/Email.png';
import Instagram from './images/Instagram.png';

import { IconButton } from '@mui/material';
import CallToActionIcon from '@mui/icons-material/CallToAction';

import { useNavigate } from 'react-router-dom';

function Landing() {

  const divStyle = {
    backgroundImage: `url(${bgimage})`,

  };

  const navigate = useNavigate();

  const contact = () => {
    navigate("/contact", { replace: true })
  }
  return (
    <div className="App" style={divStyle}>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <img src={logo} alt="Logo" />
          </div>
          <div className="navbar-right">
            {/* <IconButton aria-label="home" onClick={contact}>
              <CallToActionIcon color="action" />
            </IconButton> */}
            <a href="/login"><i className="fas fa-sign-in-alt" ></i> Login</a>
            <a href="/contact"><i class="fa fa-address-card" aria-hidden="true"></i> Contact</a>
            <a href="/signup"><i className="fas fa-user-plus"></i> Sign Up</a>

          </div>
        </div>
      </nav>
      <div className="landing-content">
        <div className="transparent-div">
          <h1>Find Events</h1>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-row">About us</div>
            <div className="footer-row">Events</div>
            <div className="footer-row">Join our team</div>
          </div>
          <div className="footer-center">
            <div className="footer-row">
              <a href="#"><img src={WhatsApp} alt="WhatsApp" /></a>
              <a href="#"><img src={Twitter} alt="Twitter" /></a>
              <a href="#"><img src={Email} alt="Mail" /></a>
              <a href="#"><img src={Instagram} alt="Instagram" /></a>
              <a href="#"><img src={Facebook} alt="Facebook" /></a>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-row">Locate us here</div>
            <div className="footer-row">pap@gmail.com</div>
            <div className="footer-row">9876543210</div>
          </div>
        </div>
        <div className="copyright">
          &copy; 2023 PAP events
        </div>
      </footer>
    </div>
  );
}

export default Landing;
