import "./input.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from 'react'
import React  from 'react';



const Carrito = () => {

  const [contador, setContador] = useState(0)


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
      <p className="counter">{contador}</p> 
        <AiOutlineShoppingCart className="cartIcon" />
      </button>
    </a>
  );
};

export default Carrito;
