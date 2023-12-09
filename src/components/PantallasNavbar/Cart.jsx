import React, { useEffect, useContext, useState  } from 'react'
import { CartContext } from "../context/ShoppingCartContext";
import {  Link} from 'react-router-dom';
import { FormControl,TextField} from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack } from "@mui/material";
import { doc,  getFirestore,addDoc, collection, updateDoc} from "firebase/firestore"
import "../Navbar/input.css";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';



const headCells = [
  {
    id: 'nombreProducto',
    numeric: false,
    disablePadding: true,
    label: 'Producto',
  },
  {
    id: 'precioUnidad',
    numeric: true,
    disablePadding: false,
    label: 'Precio Unidad',
  },
  {
    id: 'cantidad',
    numeric: true,
    disablePadding: false,
    label: 'Cantidad',
  },
  
  {
    id: 'Precio',
    numeric: true,
    disablePadding: false,
    label: 'Precio total',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell 
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel className='cabecera'
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <div className='parteSuperiorDetalle'>
    
    </div>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function cart() {



  const {
    cartContador, 
    setCartContador,
    detalleCompraTotal,
    setDetalleCompraTotal,
    productosAcomprar,
    setProductosAcomprar,
    objetosCarrito,
    setObjetosCarrito,
    orderId, 
    setOrderId,
    precio, 
    setPrecio,
    estadoCarrito, setEstadoCarrito} = useContext(CartContext)

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [productosEditados, setProductosEditados] = React.useState(objetosCarrito);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [estadoFormulario, setEstadoFormulario] = React.useState(false);
  const [error, setError] = useState(false);
  const [showDelayedText, setShowDelayedText] =    useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [open,openchange]=useState(false);
  const emptyRows =  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productosEditados.length) : 0;


  


  const abrirModlaError = () => {
    setOpenError(true);
  };

  const cerrarModlaError = () => {
    setOpenError(false);
  };

  function isValidEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  }


    const functionAbrirModalCompra=()=>{
        openchange(true);
    }
    

    if(objetosCarrito.length>0){
      setEstadoCarrito(true)
    }

  const ValidacionDeMail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError(true);
    } else {
      setError(false);
      setEstadoFormulario(false)
    }
    setEmail(event.target.value);
    console.log(email)
  }
 


  const VolverCargarModal = () => {
    setShowDelayedText(false);
   };



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

 


  function delayForm() {
    handleClick()
  }

  const handleClick = async () => {
    await delay(2000);
    setShowDelayedText(true);
  };

  const delay = async (ms) => {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
};

  

  const ejecutarCompra = (detelleCarrito ) => {

    delayForm()
    
    functionAbrirModalCompra()
      
      

    const productosDetalle = detelleCarrito.map(item => (
      {
        idProducto: item.idCodificado, 
        nombreProducto: item.nombreProducto,
        precioUnidad: item.precioUnidad,
        cantidad: item.cantidad,
        precio: item.cantidad * item.precioUnidad ,

      }
    ));

    setProductosAcomprar(productosDetalle)
    const fecha = new Date();
    const detalleTotal = {datos:{email: email , nombre: name , telefono: telefono} ,date: fecha, productosTotales:productosDetalle, estado: 'Generado', precioTotal: precio } 
    setDetalleCompraTotal(detalleTotal)
    sendOrden(detalleTotal)

    console.log(orderId)
   console.log(detalleTotal)
   console.log(precio)

}

const sendOrden=(detalleCompraTotal)=>{
  console.log(detalleCompraTotal)

  const order = {
    datosComprador:detalleCompraTotal.datos,
    Date:detalleCompraTotal.date,
    Items:detalleCompraTotal.productosTotales,
    estado:detalleCompraTotal.estado,
    precio: detalleCompraTotal.precioTotal
  }
  console.log(order)

  const db = getFirestore();
  const ordersColllection = collection(db, "ordenes");
  addDoc(ordersColllection, order).then(({id}) => setOrderId(id));


  }



  useEffect(() =>{
    
    if(!error && name != '' && telefono != ''){
      setEstadoFormulario(true)
    }
    if(error || name == '' || telefono == ''){
      setEstadoFormulario(false)
    }

    console.log(estadoFormulario)
    
  }, [productosEditados, estadoCarrito, name, telefono, email, error,showDelayedText])




  return (
     
      <div className='divCart'>
        {
          estadoCarrito ? 
          <div className='container-fluid'>
            <div className='row rowCart' style={{display: 'flex'}}>
                <div className="col-9 divMobile" style={{width: '60%'}}>
                    <Box  className='listaProductos'       >
                      <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar  />
                        <TableContainer className='fondoColor'>
                          <Table
                            sx={{ minWidth: 550 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                          >
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={productosEditados.length}
                            />
                            <TableBody >
                              {
                              objetosCarrito.map((item, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                const removeItem = (id) => {
                                  
                                    setEstadoCarrito(false)
                                  
                                  const updatedList = productosEditados.filter((item) => item.id !== id  );
                                  setProductosEditados(updatedList);
                                  setObjetosCarrito(updatedList);
                                  const updateCart = productosEditados.filter((item) => item.id === id  );
                                  setCartContador(cartContador-updateCart[0].cantidad );
                                  setPrecio(precio - updateCart[0].precio)
                                  const idProducto = updateCart[0].idCodificado;
                                  const db = getFirestore()
                                  const orderDoc = doc(db, "productos", idProducto)
                                  updateDoc(orderDoc, {cantidadProductos : 0})
                                  
                                if(cartContador < 0){
                                  setCartContador(0);
                                }
                                if(precio < 0){
                                  setCartContador(0);
                                }
                                  console.log(cartContador)
                                };

                                return (
                                  <TableRow className='rowsPersonalizadas'
                                    tabIndex={-1}
                                    key={item.id}
                                  >
                                    <TableCell className='nombreProductos'
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      padding="none"
                                    >
                                      {item.nombreProducto}
                                    </TableCell>
                                    <TableCell align="center" className='infoProductos'>${item.precioUnidad}</TableCell>
                                    <TableCell align="center" className='infoProductos'>{item.cantidad}</TableCell>
                                    <TableCell align="center" className='infoProductos'>${item.precio}</TableCell>
                                    <TableCell align="center"sx={{ cursor: 'pointer' }}> <DeleteIcon  onClick={() => removeItem(item.id)}/></TableCell>
                                  </TableRow>
                                );
                              })}
                              {emptyRows > 0 && (
                                <TableRow
                                  style={{
                                    height: (dense ? 33 : 53) * emptyRows,
                                  }}
                                >
                                  <TableCell colSpan={6} />

                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {/*<TableCell align="center" className='precioTotal'> Total a pagar: ${precio}</TableCell>*/}

                      </Paper>
                  </Box> 
                </div>
                <div className="col-3 divFormulario"   style={{width: '33%', display:'flex', justifyContent: 'center'}}>
                  <FormControl className='formulario' fullWidth sx={{ width: '33ch' }}>
                        <p className='tituloCompra'>Completar formulario para terminar</p>
                        <TextField style={{marginBottom:'20px'}}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        id="outlined-required"
                        label="Nombre"
                        size="small"
                      />
                        <TextField style={{marginBottom:'20px'}}
                        value={email}
                        onChange={ValidacionDeMail}
                        required
                        id="outlined-required"
                        label="Correo electronico"
                        type='email'
                        size="small"
                      />
                        { error ? <p  style={{marginLeft:'2%', marginTop:'-6%', fontSize:'12px', marginBottom:'2%' }}>Email inavlido</p> : <p  style={{display:'none'}}>Email inavlido</p>  }

                        <TextField style={{marginBottom:'20px' }}
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value) }
                        required
                        type='number'
                        id="outlined-required"
                        label="Telefono"
                        size="small"
                      />

                      <p className='tituloTotal' style={{marginTop:'10px'}}>Total: ${precio} </p>
                      { !estadoFormulario ? <Button style={{margin:'auto'}} type='button' onClick={abrirModlaError} target="_self" data-event="cartToOrderform" id="cart-to-orderform" className="btn btn-large btn-success pull-left-margin btn-place-order" data-i18n="cart.finalize" data-bind="click: cart.next">Proceder al pago</Button> : <Button style={{margin:'auto'}} type='button'  onClick={() => ejecutarCompra(productosEditados) } target="_self" data-event="cartToOrderform" id="cart-to-orderform" className="btn btn-large btn-success pull-left-margin btn-place-order" data-i18n="cart.finalize" data-bind="click: cart.next">Proceder al pago</Button>}
                      <Dialog
                          open={openError}
                          onClose={cerrarModlaError}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Error"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Por favor completar los datos del formulario para confirmar la compra
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={cerrarModlaError} autoFocus>
                              Volver a la compra
                            </Button>
                          </DialogActions>
                        </Dialog>
                        {showDelayedText && (
                          <div style={{textAlign:'center'}} >
                            <Dialog orderId={orderId} style={{ justifyContent:'center', textAlign:'center', margin:'auto', width:'80%'}}
                            open={open}  fullWidth maxWidth="sm">
                                <DialogTitle style={{ fontSize:'30px'}}>Tu compra se realizo con exito!!</DialogTitle>
                                <DialogContent>
                                    <Stack spacing={2} margin={2}>
                                    <DialogTitle> Id de compra: <span style={{ fontWeight:'bold'}}>{orderId}</span> </DialogTitle>
                                    <Link to="/productos"><Button color="primary" onClick={VolverCargarModal} variant="contained" style={{ margin:'auto', width:'50%'}}>Volver al inicio</Button></Link>
                                    </Stack>
                                </DialogContent>
                                <DialogActions>
                                </DialogActions>
                            </Dialog>
                          </div>     
                        )}
                    </FormControl>
                </div> 
              </div>
          </div> 

          :   

          <div> 
                <p className='tituloTotal' style={{marginTop:'10px'}}>NO HAY PRODUCTOS EN EL CARRITO </p>
            </div>
      }
      
    
    </div> 

    
  );
}


