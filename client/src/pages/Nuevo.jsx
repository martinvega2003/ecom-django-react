import React, { useEffect, useState } from 'react'
import axios from "axios"

//Importes:
import "../pages-styles/Nuevo.css"
import { ProductCard } from '../components/ProductCard'

export const Nuevo = () => {

  const [categories, setCategories] = useState([])
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    fetchCategories()
    fetchLatestProducts()
  }, [])

  const fetchCategories = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/store/categories/categories') 
    setCategories(res.data)
  }

  const fetchLatestProducts = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/store/productos/nuevo/4') 
    setLatestProducts(res.data)
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
                <button>
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
