import { useState } from 'react'
import Header from './components/Header'
import Catalog from './components/Catalog'
import MenuDesktop from './components/menus/MenuDesktop'
import {Routes, Route} from "react-router-dom"
function App() {
  

  return (
    <>
      <Header />
      <Routes>
    <Route path='/' element={<>
        <MenuDesktop />
        <Catalog />      
      </>}/>
    <Route path='/cart' element={<h1>Cart</h1>} />
      </Routes>
    </>
  )
}

export default App
