import "../pages-styles/Cart.css"
import React, {useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { useStore } from "../context/storecontext";

const Cart = () => {
    const [refresh, setRefresh] = useState(false);

    const {cartItems, setCartItems, fetchCartItems} = useStore()

    useEffect(() => {
        fetchCartItems()
    }, [refresh])

    const deleteItem = async (id) => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/v1/store/cart/delete/' + id + "/");
            const updatedCart = cartItems.filter(item => item.id !== id);
            setCartItems(updatedCart);
            setRefresh(prev => !prev)
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("No se pudo eliminar el elemento del carrito.");
        }
    }

    return (
        <div className="section my-cart">
            <h1>Mi Carrito</h1>
            {cartItems.length === 0 ? (
                <p>Tu Carrito Esta  Vacio.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div className="cart-item">
                            <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2>{item.product.name}</h2>
                                <p>${Number(item.product.price).toFixed(2)}</p>
                            </div>
                            <div className="btns cont">
                                <Link to={`/productos/${item.product.category.slug}/${item.product.slug}`} className="buy-button">Comprar</Link>
                                <button onClick={() => deleteItem(item.product.id)} className="remove-button">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="total">
                <h2>
                    Total: Gs. {cartItems.reduce((total, item) => total + Number(item.product.price), 0)}
                </h2>
            </div>
        </div>
    );
};

export default Cart;
