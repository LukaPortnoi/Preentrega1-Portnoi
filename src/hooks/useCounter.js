import { useState } from "react";

const usarContador = (valorInicial= 0, valorVariable = 1)=>{

    const [contador, setContador] = useState(valorInicial)

    const incrementar = () =>{
        setContador((contadorPrevio) => contadorPrevio + valorVariable)
    }

    const decrementar = () =>{
        if (contador > 0  ) {
            setContador((contadorPrevio) => contadorPrevio - valorVariable)
        }
    }

    return{
        contador, incrementar, decrementar
    }


}



export default usarContador