import "../components-styles/Footer.css"
import React from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'; // Icons for social media

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Contactanos</h4>
                    <p>E-commerce Nro 1234, Piso 3</p>
                    <p>Barrio Mburukuja, Asuncion</p>
                    <p>Email: contacto@ecommerce.com</p>
                </div>

                <div className="footer-section">
                    <h4>Siguenos en:</h4>
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
                    <h4>Ayuda</h4>
                    <a href="/help-center" className="help-link">Centro de ayuda</a>
                </div>

                <div className="footer-section">
                    <h4>Mantente al tanto</h4>
                    <form className="email-signup-form">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit" className="signup-button">Registrate</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 mi E-commerce. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
