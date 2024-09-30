import './App.css'

//Importes:
import {Routes, Route} from "react-router-dom"
import { Navbar } from './components/Navbar'
import { LoggedNavbar } from './components/LoggedNavbar'
import Footer from './components/Footer'
import { Home } from "./pages/Home"
import { Nuevo } from './pages/Nuevo'
import { Ofertas } from './pages/Ofertas'
import { ProductDetails } from './pages/ProductDetails'
import { StoreProvider } from './context/storecontext'
import { AuthProvider } from './context/authcontext'
import Cart from './pages/Cart'
import MyAccount from './pages/MyAccount'
import PaymentMethods from './pages/PaymentMethods'
import AddPaymentMethod from './pages/PaymentMethodForm'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {

  return (
    <>
        <StoreProvider >         
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/sign-up' element={<Signup />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/nuevo' element={<Nuevo />}/>
            <Route path='/ofertas' element={<Ofertas />}/>
            <Route path='/account' element={<MyAccount />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/payment/methods' element={<PaymentMethods />}/>
            <Route path='/payment/methods/add' element={<AddPaymentMethod />}/>
            <Route path='/productos/:category_slug/:product_slug' exact element={<ProductDetails />}/>
          </Routes>
          <Footer />
          <LoggedNavbar />
        </ StoreProvider >
    </>
  )
}

export default App
