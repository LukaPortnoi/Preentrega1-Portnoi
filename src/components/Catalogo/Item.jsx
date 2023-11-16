import React from 'react'
import ItemContador from '../DetallesProducto/ItemCount'

import { Link} from 'react-router-dom';

import Button from '@mui/material/Button';


//https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80

const Item = ({datos}) => {
    let newClassbackground= `color_bg ${datos.title}`
    let bg_img = `url(${datos.image})`




  return (
    <div className='card col-lg-4'>
        <div className='warpper1'>
            <div className={newClassbackground}></div>
            <div className='card_img' style={{"backgroundImage": bg_img}}></div>
            <div className='heart'>
                
            </div>
            <div className='cardInfo'>
                <h1 className='titulosCards'>{datos.title}</h1>
                <p className='date_'>{datos.descripcion}</p>
                <div className='action'>
                    <div className='precioGrupo'>
                        <p className='precio'>${datos.price}</p>
                    </div>
                    <Link to={`/detalleProducto/${datos.id}`}><Button variant="contained">  Ver detalle  </Button> </Link>
                    {/*<ItemContador />*/}
                </div>
            </div>

        </div>
        
    </div>
    
  )
}

export default Item
