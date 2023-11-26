import "./input.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext, useState } from 'react'
import React  from 'react';
import { CartContext } from "../context/ShoppingCartContext";



const Carrito = () => {

  const [contador, setContador] = useState(0)

  const {cartContador, setCartContador, comision} = useContext(CartContext)


 /* const contadorCarrito = () => {
    if(contador > 8){
      setContador("+9") ;
    }else{
      setContador(contador+1)
    }
    
  }
*/

  return (
    <a href="/cart">
      <button className="botonCarrito" >
      <p className="counter">{cartContador}</p> 
        <AiOutlineShoppingCart className="cartIcon" />
      </button>
    </a>
  );
};

export default Carrito;
