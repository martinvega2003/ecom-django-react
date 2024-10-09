import React, { useState } from 'react';
import axios from 'axios';
//import "../components-styles/AllPaymentMethodForm.css";

export const AddBankTransferMethod = () => {
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    // Simple validation for account number (you can customize it based on real use case)
    const validateAccountNumber = (number) => {
        const regex = /^\d{8,20}$/;  // Typical account numbers are 8-20 digits
        return regex.test(number);
    };

    const addPaymentMethod = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!accountName) {
            alert("Account holder's name cannot be empty.");
            return;
        }

        if (!validateAccountNumber(accountNumber)) {
            alert("Invalid account number. Please enter a valid account number (8-20 digits).");
            return;
        }

        const payload = {
            method_type: "bank_transfer",
            details: {
                accountName,
                accountNumber
            },
        };

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/store/payment-methods/payment-methods/', payload);
            console.log('Payment method added:', res.data);
            alert(`Bank Transfer method added: ${accountName}, ${accountNumber}`);
            setAccountName('');
            setAccountNumber('');
        } catch (error) {
            console.error('Error adding payment method:', error);
        }
    };

    return (
        <div className="add-payment-method">
            <form onSubmit={addPaymentMethod}>
                <div className="form-group">
                    <label htmlFor="accountName">Propietario</label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accountNumber">Numero de cuenta</label>
                    <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Agregar metodo</button>
            </form>
        </div>
    );
};

