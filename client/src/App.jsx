import './App.css'

//Importes:
import {Routes, Route} from "react-router-dom"
import { Navbar } from './components/Navbar'
import { Home } from "./pages/Home"
import { Nuevo } from './pages/Nuevo'
import { Ofertas } from './pages/Ofertas'
import { ProductDetails } from './pages/ProductDetails'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/nuevo' element={<Nuevo />}/>
        <Route path='/ofertas' element={<Ofertas />}/>
        <Route path='/productos/:category_slug/:product_slug' element={<ProductDetails />}/>
      </Routes>
    </>
  )
}

export default App
