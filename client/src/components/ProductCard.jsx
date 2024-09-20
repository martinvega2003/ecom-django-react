import React from 'react'
import "../components-styles/ProductCard.css"

export const ProductCard = ({image, name, description, price}) => {
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
        <button>
            Learn More
        </button>
    </div>
  )
}
