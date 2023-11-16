import React from 'react'
import Listado from './ItemList'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./cards.css";






const ItemListContainer = () => {

  const {category} = useParams()
  console.log(category)

/* const productos=[
    {id:1 , nombre: "Zapatillas" , descripcion: "Muy grandes", precio: 44, img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"},
    {id:2 , nombre: "Remera", descripcion: "talle L", precio: 22 ,img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"},
    {id:3 , nombre: "Pantalon", descripcion:"talle 38" , precio: 200 , img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"},
    {id:4 , nombre: "Pantalon", descripcion:"talle 38" , precio: 200 , img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"},
    {id:5 , nombre: "Zapatillas" , descripcion: "Muy grandes", precio: 44, img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"},
    {id:6 , nombre: "Remera", descripcion: "talle L", precio: 22 ,img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"},
    {id:7 , nombre: "Pantalon", descripcion:"talle 38" , precio: 200 , img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"},
    {id:8 , nombre: "Pantalon", descripcion:"talle 38" , precio: 200 , img : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}   
 ]

*/

 




  


    const getProducts = async() => {
    const response = await fetch("https://fakestoreapi.com/products")
    const datos = await response.json()
    
    const mostrarProductos = new Promise((resolve, reject) => {
      if ( datos.length > 0){
        setTimeout(()=>{
          resolve("hay productos disponibles")

        }, 3000)
      }else{
        reject("No hay productos disponibles")
      }
    })
  
  
    mostrarProductos.then((resultado)=> {
      console.log(resultado)
    })
    .catch((error)=> {
      console.log(error)
    })
  


    let datosFiltados= datos.filter((datos) => datos.category === category);
    if (datosFiltados == ''){
      datosFiltados = datos;
    }
    console.log(datosFiltados)
    console.log(datosFiltados.image)

    return datosFiltados;
  }

  const [productos, setProductos] = useState([])

  useEffect(() =>{

    getProducts().then((producto) => setProductos(producto))


    
    

  }, [category])


  

 
  


  return (
    <div>
        <Listado datos={productos} />
    </div>
              
            
        
    
  )
}

export default ItemListContainer
