import React from 'react'
import { FilterMenu } from '../components/FilterMenu'
import ProductList from '../components/searchBarWrapper'
import "../pages-styles/Home.css"
import { useStore } from '../context/storecontext'
import { ProductCard } from '../components/ProductCard'
import ItemCard from '../components/ItemCard'

export const Home = () => {

  const {searchedProducts} = useStore()

  return (
    <div className='section home-cont'>
      <FilterMenu />
      <div className="">
        {
          searchedProducts.length === 0 ? (<div className='empty-search'><h2>No se encontraron productos que coincidan con tu busqueda</h2></div>) : 
          ( <div className="items-container">
            {
          
              searchedProducts.map(product => {
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
              }
            )
          }
        </div>
        )}
      </div>
    </div>
  )
}
