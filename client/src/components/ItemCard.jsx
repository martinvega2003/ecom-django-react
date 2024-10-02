import React from 'react';
import { Link } from 'react-router-dom';
import "../components-styles/ItemCard.css"; // Import the CSS file

const ItemCard = ({ isDiscounted, discountPrice, image, name, price, categorySlug, productSlug }) => {
    return (
        <div className="item-card">
            <Link to={`/productos/${categorySlug}/${productSlug}`} className="card-link">
                <img src={image} alt={name} className="card-image" />
                <div className="card-content">
                    <h2 className="card-title">{name}</h2>
                    {
                        isDiscounted ? (
                            <div className="new-price-cont">
                                <p className="card-price discounted">${price}</p>
                                <p className="card-price">${discountPrice}</p>
                            </div>
                        ) : (
                            <p className="card-price">${price}</p>
                        )
                    }
                </div>
            </Link>
        </div>
    );
};

export default ItemCard;
