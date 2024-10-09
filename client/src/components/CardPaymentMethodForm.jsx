import React, { useState } from 'react';
import axios from 'axios';
import "../components-styles/CardMethodForm.css";

const AddCardPaymentMethod = () => {
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const validateCardNumber = (number) => {
        // Simple Luhn algorithm check for credit card validation
        const regex = /^\d{16}$/; // 16 digit card number
        return regex.test(number);
    };

    const validateExpiry = (expiry) => {
        // Validates MM/YY format and checks if the date is in the future
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!regex.test(expiry)) return false;
        const [month, year] = expiry.split('/');
        const expiryDate = new Date(`20${year}`, month - 1);
        const today = new Date();
        return expiryDate > today;
    };

    const validateCVV = (cvv) => {
        // Validates a 3- or 4-digit CVV code
        const regex = /^\d{3,4}$/;
        return regex.test(cvv);
    };

    const addPaymentMethod = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!validateCardNumber(cardNumber)) {
            alert("Invalid card number. Please enter a 16-digit card number.");
            return;
        }

        if (!validateExpiry(expiry)) {
            alert("Invalid expiry date. Use MM/YY format and ensure the date is in the future.");
            return;
        }

        if (!validateCVV(cvv)) {
            alert("Invalid CVV. Please enter a 3- or 4-digit CVV.");
            return;
        }

        const payload = {
            method_type: "credit_card",
            details: {
                cardHolder,
                cardNumber,
                cvv,
                expiry
            },
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
            <form onSubmit={addPaymentMethod}>
                <div className="form-group">
                    <label htmlFor="cardHolder">Propietario</label>
                    <input
                        type="text"
                        id="cardHolder"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber">Numero de la tarjeta</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiry">Vencimiento (MM/YY)</label>
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
                <button type="submit" className="submit-btn">Agregar metodo</button>
            </form>
        </div>
    );
};

export default AddCardPaymentMethod;
