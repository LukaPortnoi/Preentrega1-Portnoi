import React from 'react'
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./detalle.css";
import {doc, getDoc,  getFirestore} from "firebase/firestore"


const ItemDetailContainer = () => {


  const {id} = useParams()
  console.log(id)
  const [producto, setProducto] = useState([])


  useEffect(() =>{
    let unSoloProductos =  [1];
    const db = getFirestore()
    const oneItem = doc(db, "productos", `${id}`)

    getDoc(oneItem).then((snapshot)=>{
      
        const doc = snapshot.data()
        unSoloProductos[0]= doc
         console.log(unSoloProductos)

        setProducto(unSoloProductos)
        console.log(producto)

      
    })

  }, [])

  

  return (
    <div>
        <ItemDetail dato={producto} />
    </div>
  )
}

export default ItemDetailContainer
