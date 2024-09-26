// src/pages/PaymentMethods.js
import React, { useState } from 'react';
import "../pages-styles/PaymentMethods.css";
import { Link } from 'react-router-dom';

const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, cardNumber: '**** **** **** 1234', cardHolder: 'John Doe', expiry: '12/25' },
        { id: 2, cardNumber: '**** **** **** 5678', cardHolder: 'Jane Doe', expiry: '10/24' },
    ]);
    
    const handleRemove = (id) => {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    };

    return (
        <div className="payment-methods">
            <h1>Payment Methods</h1>
            {paymentMethods.length === 0 ? (
                <p>You have no saved payment methods.</p>
            ) : (
                <div className="method-list">
                    {paymentMethods.map(method => (
                        <div key={method.id} className="payment-method">
                            <p>{method.cardHolder}</p>
                            <p>{method.cardNumber}</p>
                            <p>Expires: {method.expiry}</p>
                            <button className="remove-btn" onClick={() => handleRemove(method.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
            <Link className="add-method-btn" to="/payment/methods/add">Add New Payment Method</Link>
        </div>
    );
};

export default PaymentMethods;
