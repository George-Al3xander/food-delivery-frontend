import Header from './components/Header'
import Catalog from './components/Catalog'
import MenuDesktop from './components/menus/MenuDesktop'
import {Routes, Route} from "react-router-dom"
import OrderButton from './components/OrderButton'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import Footer from './components/Footer'
import ProductFullDisplay from './components/ProductFullDIsplay'


function App() {
  const {cart,paddingBottomContainer, currentDisplayProductStatus} = useSelector((state: RootState) => state.mainStates)
  
  return (
    <>      
      {cart.length > 0 ? <OrderButton /> : null} 
      <Header />    
      <Routes>
      <Route path='/' element={<div style={{paddingBottom: `${paddingBottomContainer}px`}} className='container'>
        {currentDisplayProductStatus ? <ProductFullDisplay /> : null}
        <div className="split">
          <MenuDesktop />
          <Catalog />  
        </div>  
      </div>}/>
    <Route path='/cart' element={<h1>Cart</h1>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
