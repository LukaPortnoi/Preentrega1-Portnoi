import React from 'react'
import NavBar from './components/Navbar/NavBar'
import ItemListContainer from './components/Catalogo/ItemListContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/PantallasNavbar/Home'
import Cart from './components/PantallasNavbar/Cart'
import About from './components/PantallasNavbar/About'
import ItemDetailContainer from './components/DetallesProducto/ItemDetailContainer'
import ShoppingCartProvider from './components/context/ShoppingCartContext'




const App = () => {

  return (
    <div>
      <ShoppingCartProvider>
      <BrowserRouter>
        <NavBar />

        
        <Routes>
          <Route exact path= '/' element={<Home />} />
          <Route exact path= '/productos' element={<ItemListContainer />} />
          <Route exact path= '/productos/:category' element={<ItemListContainer />} />
          <Route exact path= '/productos/:category/:id' element={<ItemListContainer />} />
          <Route exact path= '/cart' element={ <Cart />} />
          <Route exact path= '/detalleProducto/:id' element={<ItemDetailContainer />} />
          <Route exact path= '/about' element={<About />} />
        </Routes>
      </BrowserRouter>
      </ShoppingCartProvider>
    </div>
    
    
  )
}

export default App


