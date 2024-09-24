import React, { useEffect, useState } from 'react'
import axios from "axios"

//Importes:
import "../pages-styles/Nuevo.css"
import { ProductCard } from '../components/ProductCard'

//ContextAPI:
import { useStore } from '../context/storecontext'

export const Nuevo = () => {

  //const [categories, setCategories] = useState([])
  const [latestProducts, setLatestProducts] = useState([])
  let errorMessage = ""

  const {selectedCategory, setSelectedCategory, categories} = useStore() //Obtenemos esto del contexto Store

  useEffect(() => {
    fetchLatestProducts()
  }, [selectedCategory])

  const fetchLatestProducts = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/v1/store/products/new/' + selectedCategory)   
      if (res.data instanceof Array) {
        setLatestProducts(res.data)
      } else {
        errorMessage = res.data.message
      }
    } catch (error) {
      alert("Error tratando de llamar a la base de datos: ", error)
    }
  }

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
                <button onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </button>
              )
            })
          }

        </div>

        <div className="productos">
          {
            latestProducts.map(product => {
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
      </div>
    </div>
  )
}
