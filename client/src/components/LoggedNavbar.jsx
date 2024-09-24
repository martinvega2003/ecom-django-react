import React from 'react'

//Importes
import "../components-styles/LoggedNavbar.css"
import { Link } from 'react-router-dom'

//De font-awesome:
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons"

//Context:
import { useStore } from '../context/storecontext'

export const LoggedNavbar = () => {

  const {categories} = useStore()
  
  return (
    <nav className='logged-h-cont'>
        <Link to="/" className='logo-cont'>
            <FontAwesomeIcon icon={faShoppingCart} size='2x' className='icon' />
        </Link>

        <div className="h-links">
            {
              categories.map(category => {
                return (
                    <Link to="/ofertas" className='link'>
                    {category.name}
                    </Link>
                )
              })
            }
            <Link className='cart-link'>carrito</Link> 
        </div>
    </nav>
  )
}
