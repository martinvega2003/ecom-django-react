// src/pages/MyAccount.js
import React from 'react';
import "../pages-styles/MyAccount.css";
import { useStore } from '../context/storecontext';
import { Link } from 'react-router-dom';

const MyAccount = () => {
    const { cartItems } = useStore();

    // Mock user data
    const user = {
        username: "JohnDoe",
        email: "johndoe@example.com",
        orders: [
            { id: 1, items: ["Product 1", "Product 2"], total: 50.00 },
            { id: 2, items: ["Product 3"], total: 30.00 },
        ],
    };

    return (
        <div className="section my-account">
            <h1>My Account</h1>
            <div className="user-info">
                <h2>Username: {user.username}</h2>
                <p>Email: {user.email}</p>
            </div>
            <div className="orders">
                <h3>Your Orders</h3>
                {user.orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <ul>
                        {user.orders.map(order => (
                            <li key={order.id}>
                                Order #{order.id}: {order.items.join(", ")} - ${order.total.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="cart-items">
                <h3>Items in Cart</h3>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.product.name} - ${Number(item.product.price).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Link to="/payment/methods" className="change-payment-btn">Change Payment Methods</Link>
        </div>
    );
};

export default MyAccount;
