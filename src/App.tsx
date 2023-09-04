import { useState } from 'react'
import Header from './components/Header'
import Catalog from './components/Catalog'
import MenuDesktop from './components/menus/MenuDesktop'
import {Routes, Route} from "react-router-dom"
import OrderButton from './components/OrderButton'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import {useEffect} from "react"

function App() {
  const {cart} = useSelector((state: RootState) => state.mainStates)
  const sections = document.querySelectorAll<HTMLElement>("section");
  const navLi = document.querySelectorAll("nav ul li");
  console.log(sections.length)
  return (
    <>
      <Header />
      <Routes>
      <Route path='/' element={<div className='container'>
        <div className="split">
          <MenuDesktop />
          <Catalog />  
        </div>  
        {cart.length > 0 ? <OrderButton /> : null} 
      </div>}/>
    <Route path='/cart' element={<h1>Cart</h1>} />
      </Routes>
    </>
  )
}

export default App
