import "../pages-styles/Cart.css"
import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../context/storecontext";

const Cart = () => {

    const {cartItems} = useStore()

    //const handleRemove = (id) => {
      //  setCartItems(cartItems.filter(item => item.product.id !== id));
    //};

    return (
        <div className="section my-cart">
            <h1>My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <Link to={`/productos/${item.product.category.slug}/${item.product.slug}`} className="cart-item">
                            <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2>{item.product.name}</h2>
                                <p>${Number(item.product.price).toFixed(2)}</p>
                            </div>
                            <div className="btns cont">
                                <button className="buy-button">Comprar</button>
                                <button className="remove-button">Eliminar</button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className="total">
                <h2>
                    Total: ${cartItems.reduce((total, item) => total + Number(item.product.price), 0).toFixed(2)}
                </h2>
            </div>
        </div>
    );
};

export default Cart;
