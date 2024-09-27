import React, { useState } from 'react';
import axios from 'axios';
//import "../components-styles/AllPaymentMethodForm.css";

export const AddBankTransferMethod = () => {
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const addPaymentMethod = async (e) => {
        e.preventDefault();
        // Include the method type in the data being sent to the backend
        const payload = {
            method_type: "bank_transfer",
            details: {
                accountName,
                accountNumber
            },  // This can be an object with specific fields (e.g., email for PayPal, card details for credit card)
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
            <h1>Add Bank Transfer Payment Method</h1>
            <form onSubmit={addPaymentMethod}>
                <div className="form-group">
                    <label htmlFor="accountName">Account Holder Name</label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accountNumber">Account Number</label>
                    <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Add Bank Transfer Method</button>
            </form>
        </div>
    );
};

