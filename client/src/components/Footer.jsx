import "../components-styles/Footer.css"
import React from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'; // Icons for social media

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>1234 E-commerce St, Suite 100</p>
                    <p>Shop City, SC 98765</p>
                    <p>Email: contact@ecommerce.com</p>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Help</h4>
                    <a href="/help-center" className="help-link">Help Center</a>
                </div>

                <div className="footer-section">
                    <h4>Stay Updated</h4>
                    <form className="email-signup-form">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Your E-commerce. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
