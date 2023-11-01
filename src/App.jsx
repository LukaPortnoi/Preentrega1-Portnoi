import React from 'react'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'

import { BrowserRouter } from 'react-router-dom'






const App = () => {

  return (
      
    <BrowserRouter>
      <NavBar />
      <ItemListContainer greeting={"Bienvenidos a APP WORK"} />
    </BrowserRouter>
    
  )
}

export default App


