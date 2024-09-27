import React, { useState } from 'react'

//Importes
import "../components-styles/LoggedNavbar.css"
import { Link } from 'react-router-dom'

//De font-awesome:
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons"

//Context:
import { useStore } from '../context/storecontext'
import axios from 'axios'
import SearchBarWrapper from './searchBarWrapper'

export const LoggedNavbar = () => {

  const {categories} = useStore()

  const [products, setProducts] = useState([])
  const [query, setQuery] = useState("")

  const search = (e) => {
    e.preventDefault()
    try {
      const res = axios.put("http://127.0.0.1:8000/api/v1/store/products/search/", query)
      setProducts(res.data)
      alert(products)
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <nav className='logged-h-cont'>
        <Link to="/" className='logo-cont'>
            <FontAwesomeIcon icon={faShoppingCart} size='2x' className='icon' />
        </Link>

        <div className="h-links">
            <Link to="/account" className='account-link'>T</Link>
            <SearchBarWrapper />
            <button className="logout-btn">
              Cerrar Sesion
            </button>
            <Link className='cart-link' to="/cart">carrito</Link> 
        </div>
    </nav>
  )
}
