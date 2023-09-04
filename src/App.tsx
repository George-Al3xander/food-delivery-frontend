import { useState } from 'react'
import Header from './components/Header'
import Catalog from './components/Catalog'
import MenuDesktop from './components/menus/MenuDesktop'
import {Routes, Route} from "react-router-dom"
import OrderButton from './components/OrderButton'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import {useEffect} from "react"
import Footer from './components/Footer'
import MenuMobile from './components/menus/MenuMobile'

function App() {
  const {cart,paddingBottomContainer} = useSelector((state: RootState) => state.mainStates)
  console.log(`${paddingBottomContainer}px`)  
  return (
    <>
      <Header />    
      <Routes>
      <Route path='/' element={<div style={{paddingBottom: `${paddingBottomContainer}px`}} className='container'>
        <div className="split">
          <MenuDesktop />
          <Catalog />  
        </div>  
        {cart.length > 0 ? <OrderButton /> : null} 
      </div>}/>
    <Route path='/cart' element={<h1>Cart</h1>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
