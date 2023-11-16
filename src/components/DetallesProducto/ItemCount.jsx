import React from 'react'
import usarContador from '../../hooks/useCounter'
import Button from '@mui/material/Button';
import { useToast } from '@chakra-ui/react'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemCount = () => {

const {contador, incrementar, decrementar} = usarContador(0,1)


const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

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
        <Button style={{  marginTop: '5%!important', display:'flex', margin:'auto' }} onClick={handleClick} variant="contained" size="medium">
          Add to cart
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Se agregaron {contador} productos
          </Alert>
        </Snackbar>
      </div>
     

  )
}

export default ItemCount
