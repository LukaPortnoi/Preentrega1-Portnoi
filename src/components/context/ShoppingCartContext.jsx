import { createContext, useState } from "react";


export const CartContext = createContext(null)

export const ShoppingCartProvider = ({children})=>{

    const [cartContador, setCartContador] = useState(0)

    const comision = 54000;

    return(
            <CartContext.Provider value={{cartContador, setCartContador, comision}}>

                {children}
            </CartContext.Provider>
    )
}

export default ShoppingCartProvider