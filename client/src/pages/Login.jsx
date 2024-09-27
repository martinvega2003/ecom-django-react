import React, { useState } from 'react';
import axios from 'axios';
import "../pages-styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginData = { username, password };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/store/login/', loginData);
            alert(response.data.message); // Handle successful login
            // Reset form
            setUsername('');
            setPassword('');
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
                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
