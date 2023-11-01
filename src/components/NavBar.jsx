import React from 'react'
import Carrito from './CartWidget'
import amazonIcono from '../Imagenes/amazon.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';





const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(false)


  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={amazonIcono} />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <FaBars/>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="iconoCarrito" >
              <Carrito />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
