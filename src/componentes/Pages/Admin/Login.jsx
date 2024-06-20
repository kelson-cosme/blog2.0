import "./Login.css"
import React from "react"
import Voltar from "../../../assets/voltar.png"
import { Link } from "react-router-dom";

import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

import { useState, useEffect } from "react";

import Admin from "./Admin";

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [userLogado, setUserLogado] = useState("")
    

    const handleLogin = async (event) => {
        event.preventDefault();

        //pegar usuário conectado
        const auth = getAuth(); 
        onAuthStateChanged(auth, (user) => {
        if (user) {
        const uid = user.email;
        setUserLogado(uid)

        } else {
            // console.log("Ninguem conectado")
        }
        });

        //Entrar        
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, senha);
          const user = userCredential

        } catch (error) {
          console.log(error)
        }
      };

      useEffect( () => {
        handleLogin(event)
    },[])


    return(
        <section  style={{ height: userLogado != "" ? "auto" : "100vh" }} className="admin">
            <div  style={{ display: userLogado != "" ? "none" : "block" }} className="voltar">
                <Link to="/"><img src={Voltar} alt="seta para voltar" /></Link>
            </div>

            
            
            <div className="areaLogin"  style={{ display: userLogado == "" ? "block" : "none"}}>
                <form className="formulario" onSubmit={handleLogin}>
                    <h1>Login</h1>

                        <label>login</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} />

                        <label>Senha</label>
                        <input type="password" onChange={(e) => setSenha(e.target.value)} />

                    <button type="submit">Entrar</button>
                </form>
            </div>

                {/* <button onClick={sair}>Sair</button> */}
                <div className="areaAdmin" style={{ display: userLogado != "" ? "block" : "none" }}>
                    <Admin/>

                    <div className="nome">
                        <h1>Bem vindo {userLogado}</h1>
                    </div>
                </div>
        </section>

        
    )
}
export default Login
