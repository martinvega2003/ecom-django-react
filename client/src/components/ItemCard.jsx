import React from 'react';
import { Link } from 'react-router-dom';
import "../components-styles/ItemCard.css"; // Import the CSS file

const ItemCard = ({ image, name, description, price, categorySlug, productSlug }) => {
    return (
        <div className="item-card">
            <Link to={`/productos/${categorySlug}/${productSlug}`} className="card-link">
                <img src={image} alt={name} className="card-image" />
                <div className="card-content">
                    <h2 className="card-title">{name}</h2>
                    <p className="card-description">{description}</p>
                    <p className="card-price">${price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ItemCard;
