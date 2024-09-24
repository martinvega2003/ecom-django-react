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

function App() {

  return (
    <>
      <StoreProvider >
        <LoggedNavbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/nuevo' element={<Nuevo />}/>
          <Route path='/ofertas' element={<Ofertas />}/>
          <Route path='/productos/:category_slug/:product_slug' exact element={<ProductDetails />}/>
        </Routes>
      </ StoreProvider >
    </>
  )
}

export default App
