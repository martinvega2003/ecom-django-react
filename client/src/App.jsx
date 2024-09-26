import './App.css'

//Importes:
import {Routes, Route} from "react-router-dom"
import { Navbar } from './components/Navbar'
import { LoggedNavbar } from './components/LoggedNavbar'
import { Home } from "./pages/Home"
import { Nuevo } from './pages/Nuevo'
import { Ofertas } from './pages/Ofertas'
import { ProductDetails } from './pages/ProductDetails'
import { StoreProvider } from './context/storecontext'
import { FilterMenu } from './components/FilterMenu'
import Cart from './pages/Cart'
import MyAccount from './pages/MyAccount'
import PaymentMethods from './pages/PaymentMethods'
import AddPaymentMethod from './pages/PaymentMethodForm'

function App() {

  return (
    <>
      <StoreProvider >
        <FilterMenu />
        <LoggedNavbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/account' element={<MyAccount />}/>
          <Route path='/nuevo' element={<Nuevo />}/>
          <Route path='/ofertas' element={<Ofertas />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/payment/methods' element={<PaymentMethods />}/>
          <Route path='/payment/methods/add' element={<AddPaymentMethod />}/>
          <Route path='/productos/:category_slug/:product_slug' exact element={<ProductDetails />}/>
        </Routes>
      </ StoreProvider >
    </>
  )
}

export default App
