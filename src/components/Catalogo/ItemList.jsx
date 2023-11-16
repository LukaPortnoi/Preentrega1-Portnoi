import React from 'react'
import Producto from './Item'


const ItemList = ({datos}) => {

  return (
    <div>
      <div className='container'>
      <div className='row filas'>
      {
        datos.map((p)=>{
        return(
          <div key={p.id} className='col-md-5'>
            <Producto 
              datos={p}
              />
          </div>
              
          ) ;
        })
      }
      </div>
    </div>
    </div>
  )
}

export default ItemList
