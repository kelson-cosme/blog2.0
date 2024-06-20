import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "../NavBar/NavBar"

import Home from "../Pages/Home"
import Detalhes from "../Pages/Detalhes"
import Login from "../Pages/Admin/Login"
import CriarPost from "../Pages/Admin/CriarPost"

function Rotas() {

    return (
        <BrowserRouter>


            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/detalhes/:id" element={<Detalhes/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/new" element={<CriarPost/> }/>
            </Routes>
        </BrowserRouter>
    )
  }
  
  export default Rotas
  