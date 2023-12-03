import React from 'react'
import Listado from './ItemList'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./cards.css";
import Loadering from '../Loader/loader';
import {collection, getDocs,  getFirestore} from "firebase/firestore"





const ItemListContainer = () => {

  const {category} = useParams()
  console.log(category)

  const [progreso, setProgreso] = useState(null);
  const [productos, setProductos] = useState([])


    
     
  /*
    const getProducts = async() => {
    const response = await fetch("https://fakestoreapi.com/products")
    const datos = await response.json()
  

    let datosFiltados= datos.filter((datos) => datos.category === category);
    if (datosFiltados == ''){
      datosFiltados = datos;
    }
    console.log(datosFiltados)

    return datosFiltados;
  }
*/

  useEffect(() =>{

    setProgreso(true)

    let datosFiltados
    const db = getFirestore()
    const itemCollection = collection(db, "productos")
    getDocs(itemCollection).then((snapshot)=>{
      setTimeout(()=>{
        const datos = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}))
       datosFiltados= datos.filter((datos) => datos.category === category)
        if (datosFiltados == ''){
          datosFiltados = datos;
        }
        console.log(datosFiltados)
        setProductos(datosFiltados)
        setProgreso(false)
        }, 3000)
      }
    ).catch((error) => {
      console.log(error)
    })
  
    

  }, [category])

  if(progreso){
    return <Loadering />
  }


  

 
  


  return (
    <div>
        <Listado datos={productos} />
    </div>
              
            
        
    
  )
}

export default ItemListContainer
