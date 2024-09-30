// src/pages/PaymentMethods.js
import React, { useState } from 'react';
import axios from 'axios';
import "../pages-styles/PaymentMethods.css";
import { Link } from 'react-router-dom';
import { useStore } from '../context/storecontext';

const PaymentMethods = () => {
    const {paymentMethods, setPaymentMethods} = useStore()
    
    const handleRemove = async (id) => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/v1/store/payment-methods/delete/' + id + "/");
            setPaymentMethods(paymentMethods.filter(method => method.id !== id));
        } catch (error) {
            console.error('Error fetching payment methods', error);
        }
    };

    return (
        <div className="section payment-methods">
            <h1>Payment Methods</h1>
            {paymentMethods.length === 0 ? (
                <p>You have no saved payment methods.</p>
            ) : (
                <div className="method-list">
                    {paymentMethods.map(method => { return method.method_type === "credit_card" ? 
                    (
                        <div key={method.id} className="payment-method">
                            <div>
                                <h4>{method.method_type}</h4>
                                <div className="info">
                                    <p>{method.details.cardHolder}</p>
                                    <p>{method.details.cardNumber}</p>
                                    <p>Expires: {method.details.expiry}</p>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => handleRemove(method.id)}>Remove</button>
                        </div>
                    ) : method.method_type === "paypal" ? (
                        <div className="payment-method">
                            <div>
                                <h4>{method.method_type}</h4>
                                <p>{method.details.email}</p>
                            </div>
                            <button className="remove-btn" onClick={() => handleRemove(method.id)}>Remove</button>
                        </div>
                    ) :(
                        <div className="payment-method">
                            <div>
                                <h4>{method.method_type}</h4>
                                <div className="info">
                                    <p>{method.details.accountName}</p>
                                    <p>{method.details.accountNumber}</p>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => handleRemove(method.id)}>Remove</button>
                        </div>
                    )
                })}
                </div>
            )}
            <Link className="add-method-btn" to="/payment/methods/add">Add New Payment Method</Link>
        </div>
    );
};

export default PaymentMethods;
