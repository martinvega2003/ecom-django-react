import React from 'react'
import "../components-styles/ProductCard.css"
import { Link } from 'react-router-dom'

export const ProductCard = ({image, name, description, price, categorySlug, productSlug}) => { 
  return (
    <div className='product-card'>
        <img src={image} alt="" />
        <h4>
            {name}
        </h4>
        <p>
            {description}
        </p>
        <span>
            {price}
        </span>
        <Link to={"/productos/" + categorySlug + "/" + productSlug}>
            <button>
                Learn More
            </button>
        </Link>
    </div>
  )
}
  

