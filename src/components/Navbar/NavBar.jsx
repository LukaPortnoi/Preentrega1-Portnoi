import React from 'react'
import Carrito from './CartWidget'
import amazonIcono from '../../Imagenes/amazon.png'
import { useState } from 'react'
import { NavLink, Link} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import {FiChevronDown } from "react-icons/fi";








const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(false)


  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
      setisMenu(isMenu === false ? true : false);
      setResponsiveclose(isResponsiveclose === false ? true : false);
  };

    let boxClass = ["main-menu menu-right menuq1"];
    if(isMenu) {
        boxClass.push('menuq2');
    }else{
        boxClass.push('');
    }

    const [isMenuSubMenu, setMenuSubMenu] = useState(false);
      
    const toggleSubmenu = () => {
      setMenuSubMenu(isMenuSubMenu === false ? true : false);
    };
    
    let boxClassSubMenu = ["sub__menus"];
    if(isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    }else {
        boxClassSubMenu.push('');
    }

  

  return (
    <nav className="navbar main-nav">
      
      <div className="containerNav">
        <div className="logo">
          <img className="imgAmazon"  src={amazonIcono} />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <FaBars/>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to={`/`}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/productos">Productos</NavLink>
            </li>
            <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" >  Shop <FiChevronDown /> 
                        <ul className={boxClassSubMenu.join(' ')} > 
                            <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/productos/mujer`}> Women's </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/productos/hombre`}> Mens </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/productos/joya`}> jewelery </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/productos/electronica`}> Electronics </NavLink> </li>
                        </ul>
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
