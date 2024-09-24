import React from 'react'
import ProductList from '../components/searchBarWrapper'
import "../pages-styles/Home.css"
import { useStore } from '../context/storecontext'
import { ProductCard } from '../components/ProductCard'

export const Home = () => {

  const {searchedProducts} = useStore()

  return (
    <div className='home-cont'>
      {
        searchedProducts.map(product => {
          return (
            <ProductCard 
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
