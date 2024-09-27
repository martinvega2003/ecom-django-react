// src/pages/AddPaymentMethod.js
import React, { useState } from 'react';
import axios from 'axios';
import "../components-styles/CardMethodForm.css";

const AddCardPaymentMethod = () => {
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const addPaymentMethod = async (e) => {
        e.preventDefault();
        // Include the method type in the data being sent to the backend
        const payload = {
            method_type: "credit_card",
            details: {
                cardHolder,
                cardNumber,
                cvv,
                expiry
            },  // This can be an object with specific fields (e.g., email for PayPal, card details for credit card)
        };
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/store/payment-methods/payment-methods/', payload);
            console.log('Payment method added:', res.data);
            alert(`Payment method added: ${cardHolder}, ${cardNumber}`);
            setCardHolder('');
            setCardNumber('');
            setExpiry('');
            setCvv('');
        } catch (error) {
            console.error('Error adding payment method:', error);
        }
    };

    return (
        <div className="add-payment-method">
            <h1>Add New Payment Method</h1>
            <form onSubmit={addPaymentMethod}>
                <div className="form-group">
                    <label htmlFor="cardHolder">Card Holder Name</label>
                    <input
                        type="text"
                        id="cardHolder"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiry">Expiry Date (MM/YY)</label>
                    <input
                        type="text"
                        id="expiry"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Add Payment Method</button>
            </form>
        </div>
    );
};

export default AddCardPaymentMethod;
