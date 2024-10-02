import React, { useEffect, useState } from 'react'
import axios from "axios"

//Importes:
import "../pages-styles/Nuevo.css"
import { ProductCard } from '../components/ProductCard'
import ItemCard from '../components/ItemCard'

//ContextAPI:
import { useStore } from '../context/storecontext'

export const Nuevo = () => {

  //const [categories, setCategories] = useState([])
  const [latestProducts, setLatestProducts] = useState([])
  let errorMessage = ""

  const {selectedCategory, setSelectedCategory, categories} = useStore() //Obtenemos esto del contexto Store

  useEffect(() => {
    fetchLatestProductsGPT()
  }, [selectedCategory])

  const fetchLatestProductsGPT = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/store/products/new/${selectedCategory}`);
      console.log(res.data); // Check the fetched data

      if (Array.isArray(res.data)) {
        setLatestProducts(res.data); // Set latest products if response is an array
      } else {
        setLatestProducts([])
      }
    } catch (error) {
      alert("Error fetching data from the database: " + error); // Show error if fetch fails
    }
  };

  return (
    <div className='nuevo-cont'>
      <div className="nuevo-encabezado">
        <h2>
          Explora los productos mas nuevos
        </h2>
        <p>
          Ve por categorias los productos añadidos en las ultimas 48 horas
        </p>
      </div>

      <div className="nuevo-contenido">
        <div className="categorias">

          {
            categories.map(category => {
              return (
                <button className={selectedCategory === category.id ? "active" : ""} onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </button>
              )
            })
          }

        </div>

        <div className="productos items-container">
          {
            latestProducts.length === 0 ? (<div className='empty-category'><h2>No hay productos en oferta en esta categoria</h2></div>) : latestProducts.map(product => {
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
            })
          }

        </div>
      </div>
    </div>
  )
}
