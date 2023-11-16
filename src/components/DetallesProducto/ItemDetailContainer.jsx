import React from 'react'
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./detalle.css";

const ItemDetailContainer = () => {


  const {id} = useParams()
  console.log(id)

  const getProducts = async() => {
    const response = await fetch("https://fakestoreapi.com/products")
    const datos = await response.json()
    
    let datosFiltados= datos.filter((datos) => datos.id == id);
    
    console.log(datosFiltados)
    console.log(datosFiltados.image)
    return datosFiltados;
  }

  const [producto, setProductos] = useState([])

  useEffect(() =>{
    
    getProducts().then((producto) => setProductos(producto))

  }, [])

  

  return (
    <div>
        <ItemDetail dato={producto} imagen={producto.image} />
    </div>
  )
}

export default ItemDetailContainer
