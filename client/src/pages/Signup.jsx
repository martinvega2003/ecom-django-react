import React, { useState } from 'react';
import axios from 'axios';
import "../pages-styles/Signup.css";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden!");
            return;
        }
        
        const userData = { username, email, password };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/users/register/', userData);
            alert(`User created: ${response.data.username}`);
            // Reset form
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed.');
        }
    };

    return (
        <div className="section signup-form-cont">
            <div className="signup-form">
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="btn-cont">
                        <button type="submit" className="submit-btn">Sign Up</button>
                        <Link to="/login" className='login-text'>Ya tienes una cuenta?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
