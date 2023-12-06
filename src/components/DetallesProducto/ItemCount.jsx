import React from 'react'
import usarContador from '../../hooks/useCounter'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { CartContext } from "../context/ShoppingCartContext";
import { useContext, useState } from 'react'
import { doc,  getFirestore,getDoc, updateDoc} from "firebase/firestore"



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemCount = ({idActualizar}) => {

  const id = idActualizar;
 


const {contador, incrementar, decrementar} = usarContador(0,1)
const {cartContador, setCartContador, objetosCarrito, setObjetosCarrito, precio, setPrecio,estadoCarrito, setEstadoCarrito} = useContext(CartContext)
const [agregoCarrito, setAgregoCarrito] = useState(true);


const [open, setOpen] = React.useState(false);

const updateOrder=(contador) => {
  const db = getFirestore()
  const orderDoc = doc(db, "productos", id)
  getDoc(orderDoc).then((snapshot)=>{
    const doc = snapshot.data()
    const productos = {idCodificado: id, id: `${doc.idUnico}`, nombreProducto: `${doc.title}`, precioUnidad: `${doc.price}`, cantidad: contador, precio: doc.price * contador};
    setObjetosCarrito(producto => [...producto, productos]);
    setPrecio(precio + doc.price * contador)
  })
  updateDoc(orderDoc, {cantidadProductos : contador})
  console.log(objetosCarrito)
  console.log(precio)


}
 
  const handleClick = () => {
    setOpen(true);
    setCartContador(cartContador + contador)
    setAgregoCarrito(false)
    setEstadoCarrito(true)
    
    updateOrder(contador)
    console.log(objetosCarrito)

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

console.log(precio)


  return (
    <div>
        
        <ButtonGroup style={{  marginBottom: '5%'}}>
          
          <Stack direction="row" spacing={1.5}>
          <Button aria-label="reduce" onClick={decrementar} >
            <RemoveIcon fontSize="small" />
          </Button>
          <Item>{contador}</Item>
          <Button aria-label="increase" onClick={incrementar}>
            <AddIcon fontSize="small" />
          </Button>
          </Stack>
          
            
        </ButtonGroup>
        { agregoCarrito ? <Button style={{  marginTop: '5%!important', display:'flex', margin:'auto' }} onClick={handleClick} variant="contained" size="medium">  Agregar   </Button>   : <Button style={{  marginTop: '5%!important', display:'flex', margin:'auto' }}  variant="contained" size="medium">Ir al Carriro</Button> }
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Se agregaron {contador} productos
          </Alert>
        </Snackbar>
      </div>
     

  )
}

export default ItemCount
