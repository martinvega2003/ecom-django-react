import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ProductCard } from '../components/ProductCard'

//Importes:
import "../pages-styles/Ofertas.css"

export const Ofertas = () => {

  const [categories, setCategories] = useState([])
  const [latestProducts, setLatestProducts] = useState([])

  //const categoryId = 4

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
    <div className='ofertas-cont'>
      <div className="ofertas-encabezado">
        <div className="texto">
          <h2>
            Gran Oferta
          </h2>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Assumenda corrupti asperiores magnam sed exercitationem impedit 
            obcaecati veniam culpa, facere perspiciatis libero sint maxime 
            consectetur natus a! Cumque saepe .
          </p>

          <div>
            <button className="more-btn">
              mas informacion 
            </button>

            <button className="add-cart-btn">
              Agregar al carrito
            </button>
          </div>

        </div>

        <div className="imagen">
          <img src="../../../media/uploads/white-tshirt_8LADqMw.jfif" alt="" />
        </div>
      </div>

      <div className="ofertas-contenido">
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
                />
              )
            })
          } 
        </div>
      </div>
    </div>
  )
}

