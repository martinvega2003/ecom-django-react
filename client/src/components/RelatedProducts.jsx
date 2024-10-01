import React from 'react'
import ItemCard from './ItemCard'
import "../components-styles/RelatedProducts.css"

export const RelatedProducts = ({relatedProducts}) => {
  return (
    <div className='related-products'>
        {
            relatedProducts.map(product => {
                return (
                    <ItemCard 
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        productSlug={product.slug}
                        categorySlug={product.category.slug}
                    />
                )
            })
        }
    </div>
  )
}
