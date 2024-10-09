// src/pages/MyAccount.js
import React, { useEffect, useState } from 'react';
import "../pages-styles/MyAccount.css";
import { useStore } from '../context/storecontext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyAccount = () => {
    const { cartItems } = useStore();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    // Mock user data
    const user = {
        username: "JohnDoe",
        email: "johndoe@example.com",
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/store/orders/')
            setOrders(res.data)
        } catch (error) {
            alert("Error fetching the orders")
        }
    }

    return (
        <div className="section my-account">
            <h1>Mi cuenta</h1>
            <div className="user-info">
                <h2>Usuario: {user.username}</h2>
                <p>Email: {user.email}</p>
            </div>
            <div className="orders">
                <h3>Tus compras</h3>
                {orders.length === 0 ? (
                    <p>Aun no tienes compras en el historial</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={Number(order.order_number)}>
                                Orden #{order.order_number}: {order.product_name} - Gs. {order.total_amount} - Fecha: {order.date}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="cart-items">
                <h3>Productos en el carrito</h3>
                {cartItems.length === 0 ? (
                    <p>Tu carrito esta vacio</p>
                ) : (
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.product.name} - Gs. {Number(item.product.price)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Link to="/payment/methods" className="change-payment-btn">Metodos de pago</Link>
        </div>
    );
};

export default MyAccount;
