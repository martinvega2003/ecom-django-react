import React, { useState } from 'react';
import axios from 'axios';
//import "../components-styles/AllPaymentMethodForm.css";

export const AddPayPalMethod = () => {
    const [email, setEmail] = useState('');

    const addPaymentMethod = async (e) => {
        e.preventDefault();
        // Include the method type in the data being sent to the backend
        const payload = {
            method_type: "paypal",
            details: {
                email,
            },  // This can be an object with specific fields (e.g., email for PayPal, card details for credit card)
        };
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/store/payment-methods/payment-methods/', payload);
            console.log('Payment method added:', res.data);
            alert(`Paypal method added: ${email}`);
            setEmail('');;
        } catch (error) {
            console.error('Error adding payment method:', error);
        }
    };

    return (
        <div className="add-payment-method">
            <h1>Add PayPal Payment Method</h1>
            <form onSubmit={addPaymentMethod}>
                <div className="form-group">
                    <label htmlFor="paypalEmail">PayPal Email</label>
                    <input
                        type="email"
                        id="paypalEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Add PayPal Method</button>
            </form>
        </div>
    );
};

