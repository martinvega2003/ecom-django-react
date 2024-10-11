import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../pages-styles/Login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginData = { username, password };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/users/login/', loginData);
            const { token } = response.data;

            // Save token to local storage
            localStorage.setItem('token', token);
            alert("Login successful!");

            // Reset form
            setUsername('');
            setPassword('');
            navigate("/")
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Check your credentials.');
        }
    };

    return (
        <div className="login-form-cont">
            <div className="login-form">
                <h1>Login to Your Account</h1>
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
