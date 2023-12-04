import { createContext, useState } from "react";


export const CartContext = createContext(null)

export const ShoppingCartProvider = ({children})=>{

    const [cartContador, setCartContador] = useState(0)
    const [objetosCarrito, setObjetosCarrito] = useState ([])
    const [precio, setPrecio] = useState (0)



    return(
            <CartContext.Provider value={{cartContador, setCartContador, objetosCarrito, setObjetosCarrito, precio, setPrecio}}>

                {children}
            </CartContext.Provider>
    )
}

export default ShoppingCartProvider