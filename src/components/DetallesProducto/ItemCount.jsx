import React from 'react'
import usarContador from '../../hooks/useCounter'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useToast } from '@chakra-ui/react'


const ItemCount = () => {

const {contador, incrementar, decrementar} = usarContador(0,1)
const toast = useToast()


const agregarCarrito= ()=>{
  alert(`se agrego al carrito ${contador} productos`)
}

  return (
    <div>
        <Stack direction="row" spacing={2} className='contador'>
        <Button variant="contained" onClick={decrementar}  size="small" style={{ fontSize:'20px' }}>
            -
        </Button>
        
        <Button disabled  size="small" style={{ fontSize:'20px', color:'black'}}>{contador} </Button>
        <Button className='botnMasyMenos' variant="contained"  onClick={incrementar}  style={{ fontSize:'20px' }}>
            +
        </Button>
        <br />
    </Stack>
        <Button variant="contained" size="large" className='botonAgregarCarrito' onClick={agregarCarrito}>Agregar</Button>
    </div>
     

  )
}

export default ItemCount
