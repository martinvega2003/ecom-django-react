import { useState } from 'react'
import './App.css'

//Importes:
import {Routes, Route} from "react-router-dom"
import { Navbar } from './components/Navbar'
import { Home } from "./pages/Home"
import { Nuevo } from './pages/Nuevo'
import { Ofertas } from './pages/Ofertas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/nuevo' element={<Nuevo />}/>
        <Route path='/ofertas' element={<Ofertas />}/>
      </Routes>
    </>
  )
}

export default App
