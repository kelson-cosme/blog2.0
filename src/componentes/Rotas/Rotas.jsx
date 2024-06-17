import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "../NavBar/NavBar"

import Home from "../Pages/Home"
import Detalhes from "../Pages/Detalhes"

function Rotas() {

    return (
        <BrowserRouter>

            <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/detalhes/:id" element={<Detalhes/>} />

            </Routes>
        </BrowserRouter>
    )
  }
  
  export default Rotas
  