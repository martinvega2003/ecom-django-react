import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ProductCard } from '../components/ProductCard'
import ItemCard from '../components/ItemCard'

//Importes:
import "../pages-styles/Ofertas.css"

//Context:
import { useStore } from '../context/storecontext'

export const Ofertas = () => {

  //const [categories, setCategories] = useState([])
  const [discountedProducts, setDiscountedProducts] = useState([])
  let errorMessage = ""

  const {selectedCategory, setSelectedCategory, categories} = useStore() //Obtenemos esto del contexto Store

  useEffect(() => {
    //fetchCategories()
    fetchDiscountedProducts()
  }, [selectedCategory])

  const fetchDiscountedProducts = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/v1/store/products/' + selectedCategory)   
      if (res.data instanceof Array) {
        setDiscountedProducts(res.data)
      } else {
        errorMessage = res.data.message
        setDiscountedProducts([])
      }
    } catch (error) {
      alert("Error tratando de llamar a la base de datos: ", error)
    }
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
                <button className={selectedCategory === category.id ? "active" : ""} onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </button>
              )
            })
          }

        </div>

        <div className="productos items-container">
          {
            discountedProducts.length === 0 ? (<div className='empty-category'><h2>No hay productos en oferta en esta categoria</h2></div>) : discountedProducts.map(product => {
              return (
                <ItemCard 
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

