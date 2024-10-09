import React, { useState } from 'react';
import axios from 'axios';
//import "../components-styles/AllPaymentMethodForm.css";

export const AddPayPalMethod = () => {
    const [email, setEmail] = useState('');

    // Simple email validation function
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const addPaymentMethod = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!validateEmail(email)) {
            alert("Invalid email. Please enter a valid PayPal email address.");
            return;
        }

        const payload = {
            method_type: "paypal",
            details: {
                email,
            },
        };

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/store/payment-methods/payment-methods/', payload);
            console.log('Payment method added:', res.data);
            alert(`Paypal method added: ${email}`);
            setEmail('');
        } catch (error) {
            console.error('Error adding payment method:', error);
        }
    };

    return (
        <div className="add-payment-method">
            <form onSubmit={addPaymentMethod}>
                <div className="form-group">
                    <label htmlFor="paypalEmail">Email de su PayPal</label>
                    <input
                        type="email"
                        id="paypalEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Agregar metodo</button>
            </form>
        </div>
    );
};
