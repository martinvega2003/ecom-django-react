// src/pages/AddPaymentMethod.js
import React, { useState } from 'react';
import "../pages-styles/PaymentMethodForm.css";

const AddPaymentMethod = () => {
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle adding the new payment method logic here
        alert(`Payment method added: ${cardHolder}, ${cardNumber}`);
        // Reset form
        setCardHolder('');
        setCardNumber('');
        setExpiry('');
        setCvv('');
    };

    return (
        <div className="add-payment-method">
            <h1>Add New Payment Method</h1>
            <form onSubmit={handleSubmit}>
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

export default AddPaymentMethod;
