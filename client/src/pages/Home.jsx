import React, {useState, useEffect } from 'react'
import { FilterMenu } from '../components/FilterMenu'
import ProductList from '../components/searchBarWrapper'
import "../pages-styles/Home.css"
import { useStore } from '../context/storecontext'
import { ProductCard } from '../components/ProductCard'
import ItemCard from '../components/ItemCard'

export const Home = () => {

  const [gender, setGender] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [inDiscount, setInDiscount] = useState(false);
  const [isActive, setIsActive] = useState(true)

  const { searchedProducts, setSearchedProducts, products } = useStore();
  //const [filteredProducts, setFilteredProducts] = useState([...searchedProducts])

  useEffect(() => {
    setSearchedProducts(products); // Initialize with the full product list
  }, [products, setSearchedProducts]);

  const handleFilter = () => {
    let filtered = [...products]
    if (gender.length > 0) filtered = filtered.filter(product => product.gender == gender);
    if (minPrice > 0) filtered = filtered.filter(product => product.price >= minPrice);
    if (maxPrice > 0) filtered = filtered.filter(product => product.price <= maxPrice);
    if (category.length > 0) filtered = filtered.filter(product => product.category.name == category);
    if (inDiscount) filtered = filtered.filter(product => product.isDiscounted);
  
    setSearchedProducts(filtered);
  };
  


  return (
    <div className='section home-cont'>
      
      <div>
        {
          searchedProducts.length === 0 ? (<div className='empty-search'><h2>No se encontraron productos que coincidan con tu busqueda</h2></div>) : 
          ( <div className={isActive ? "items-container active" : "items-container"}>
            {
          
              searchedProducts.map(product => {
                return (
                  <ItemCard 
                    isDiscounted={product.isDiscounted}
                    discountPrice={product.discountPrice}
                    image={product.image}
                    name={product.name}
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
      <FilterMenu isActive={isActive} setIsActive={setIsActive} handleFilter={handleFilter} setGender={setGender} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setCategory={setCategory} setInDiscount={setInDiscount} inDiscount={inDiscount} /> 
    </div>
  )
}
