import React from 'react'
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import "./detalle.css";
import {doc, getDoc,  getFirestore} from "firebase/firestore"
import { CartContext } from "../context/ShoppingCartContext";



const ItemDetailContainer = () => {

  const {objetosCarrito, setObjetosCarrito, precio, setPrecio} = useContext(CartContext)
  const {id} = useParams()
  const [producto, setProducto] = useState([])
  const [idActualizar, setIdActualizar] = useState('')



  useEffect(() =>{
    setTimeout
    const db = getFirestore()
    const oneItem = doc(db, "productos", `${id}`)
    getDoc(oneItem).then((snapshot)=>{
      setTimeout(()=>{
        const doc = snapshot.data()
        const docId = snapshot.id
        console.log(docId)

        setProducto(producto => [...producto, doc]);
        setIdActualizar(docId);


        }, 1000)
        

    })
  }, [])


  return (
    <div>
        <ItemDetail dato={producto} id={idActualizar} />
    </div>
  )
}

export default ItemDetailContainer
