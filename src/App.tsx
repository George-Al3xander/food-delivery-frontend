import Header from './components/Header'
import Catalog from './components/Catalog'
import MenuDesktop from './components/menus/MenuDesktop'
import {Routes, Route, Navigate, useLocation} from "react-router-dom"
import OrderButton from './components/OrderButton'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import Footer from './components/Footer'
import ProductFullDisplay from './components/ProductFullDIsplay'
import Cart from './components/Cart'
import OrderPage from './components/OrderPage'
import Map from './components/Map'

function App() {  
  const {cart,paddingBottomContainer, currentDisplayProductStatus, cartDisplayStatus} = useSelector((state: RootState) => state.mainStates)
  const location = useLocation();

  return (
    <>   
    <Map />        
      {(location.pathname != "/order" &&cart.length > 0) ? <OrderButton /> : null} 
      <Header />    
      <Routes>
      <Route path='/' element={<div style={{paddingBottom: `${paddingBottomContainer}px`}} className='container'>
        {currentDisplayProductStatus ? <ProductFullDisplay /> : null}
        {(cartDisplayStatus == true && cart.length > 0) ? <Cart /> : null}
        <div className="split">
          <MenuDesktop />
          <Catalog />  
        </div>  
      </div>}/>
    <Route path='/order' element={cart.length > 0 ? <OrderPage /> : <Navigate to="/"/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
