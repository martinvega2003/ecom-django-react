import React from 'react'

//Importes
import "../components-styles/Navbar.css"
import { Link } from 'react-router-dom'

//De font-awesome:
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons"

export const Navbar = () => {
  return (
    <nav className='h-cont'>
        <Link to="/" className='logo-cont'>
            <FontAwesomeIcon icon={faShoppingCart} size='2x' className='icon' />
        </Link>

        <div className="h-links">
            <Link to="/ofertas" className='link'>ofertas</Link>
            <Link to="/nuevo" className='link'>nuevo</Link>
            <Link className='login-link'>iniciar sesion</Link>
            <Link className='cart-link'>carrito</Link> 
        </div>
    </nav>
  )
}
