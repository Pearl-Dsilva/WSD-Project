// import React from 'react';
import React, { useEffect } from 'react';
import './landing.css'; // Import your CSS file
import logo from './logo.jpg';
import WhatsApp from './WhatsApp.png';
import Facebook from './Facebook.png';
import Twitter from './TwitterX.png';
import Email from './Email.png';
import Instagram from './Instagram.png';

function Contact() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <img src={logo} alt="Logo" /> {/* Replace 'your-logo.png' with your logo's URL or file path */}
          </div>
          <div className="navbar-right">
            <a href="login"><i className="fas fa-sign-in-alt"></i> Login</a>
            <a href="signup"><i className="fas fa-user-plus"></i> Sign Up</a>
          </div>
        </div>
      </nav>

      <div className="landing-content">
        <div className="page-container">
          <div className="contact-content">
            <div className="geolocation">
              {/* <!-- Add your geolocation map or content here --> */}
              <div style={{ position: 'relative', width: '100%', height: '450px' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5558789579445!2d77.6036138753817!3d12.936241415651901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b277a93807%3A0x88518f37b39dabd0!2sChrist%20University!5e0!3m2!1sen!2sin!4v1696940407736!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div className="contact-form" style={{ height: '450px' }}>
              <h2>JOIN OUR TEAM</h2>
              <form action="##">
                <div className="form-group">
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label for="comment">Leave us a comment:</label>
                  <textarea id="comment" name="comment" rows="4" required></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
              <div id="myModal" class="modal">
                <div className="modal-content">
                  <span class="close">&times;</span>
                  <p>Your response has been submitted </p>
                </div>
              </div>
            </div>
          </div>
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

export default Contact;
// export Contact; 