import React, { useEffect } from 'react'
import { CartContext } from "../context/ShoppingCartContext";
import { useContext, useState, Fragment } from 'react'
import { FormControl,TextField, OutlinedInput, InputLabel, InputAdornment} from '@mui/material';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
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













// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)


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
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
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
  const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }

  if(objetosCarrito.length>0){
    setEstadoCarrito(true)
  }
  console.log(objetosCarrito)

 





  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

 

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productosEditados.length) : 0;
  

  const ejecutarCompra = (detelleCarrito ) => {

    functionopenpopup()
      
      

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

    
    
  }, [productosEditados, estadoCarrito])




  return (
     
      <div>
      {
      estadoCarrito ? 
      <div className='container-fluis'>
        <div className='row ' style={{display: 'flex'}}>
          
          <div className="col-9" style={{width: '60%'}}>
              <Box  className='listaProductos'>
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
                  <TextField style={{marginBottom:'10px'}}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  id="outlined-required"
                  label="Nombre"
                  size="small"

                />
                  <TextField style={{marginBottom:'10px'}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="outlined-required"
                  label="Correo electronico"
                  type='email'
                  size="small"

                />
                  <TextField style={{marginBottom:'10px'}}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  type='number'
                  id="outlined-required"
                  label="Telefono"
                  size="small"
                />
                <p className='tituloTotal' style={{marginTop:'10px'}}>Total: ${precio} </p>
                <button  onClick={() => ejecutarCompra(productosEditados) } target="_self" data-event="cartToOrderform" id="cart-to-orderform" className="btn btn-large btn-success pull-left-margin btn-place-order" data-i18n="cart.finalize" data-bind="click: cart.next">Proceder al pago</button>
                <div style={{textAlign:'center'}}>
                  <Dialog style={{ justifyContent:'center', textAlign:'center', margin:'auto', width:'80%'}}
                  // fullScreen 
                  open={open} onClose={closepopup} fullWidth maxWidth="sm">
                      <DialogTitle style={{ fontSize:'30px'}}>Tu compra se realizo con exito!!</DialogTitle>
                      <DialogContent>
                          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                          <Stack spacing={2} margin={2}>
                          <DialogTitle> Id de compra: <span style={{ fontWeight:'bold'}}>{orderId}</span> </DialogTitle>
                            <Button color="primary" variant="contained" style={{ margin:'auto', width:'50%'}}>Volver al inicio</Button>
                          </Stack>
                      </DialogContent>
                      <DialogActions>
                      {/* <Button color="success" variant="contained">Yes</Button>
                          <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                      </DialogActions>
                  </Dialog>
                    </div>        
                          {/*<TableCell align="center" className='precioTotal'> Total a pagar: </TableCell>*/}
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