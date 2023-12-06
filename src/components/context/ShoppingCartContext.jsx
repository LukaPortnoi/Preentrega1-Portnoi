import { createContext, useState } from "react";


export const CartContext = createContext(null)

export const ShoppingCartProvider = ({children})=>{

    const [cartContador, setCartContador] = useState(0)
    const [objetosCarrito, setObjetosCarrito] = useState ([])
    const [precio, setPrecio] = useState (0)
    const [detalleCompraTotal, setDetalleCompraTotal] = useState({})
    const [productosAcomprar, setProductosAcomprar] = useState([])
    const [orderId, setOrderId] = useState('')
    const [estadoCarrito, setEstadoCarrito] = useState(false);







    return(
            <CartContext.Provider value={{cartContador,detalleCompraTotal,orderId, setOrderId,estadoCarrito, setEstadoCarrito, productosAcomprar, setProductosAcomprar, setDetalleCompraTotal, setCartContador, objetosCarrito, setObjetosCarrito, precio, setPrecio}}>
                {children}
            </CartContext.Provider>
    )
}

export default ShoppingCartProvider