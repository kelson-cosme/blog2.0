import { signOut, getAuth } from "firebase/auth";
import { auth, dataBase } from "../Home";

import { getFirestore,addDoc, getDocs, collection, documentId } from "firebase/firestore";

import "./Admin.css"


import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Admin() {


    function sair(){

        
        window.location.reload(true);

        signOut(auth).then(() => {
            setUserLogado("")
            console.log("Sign-out successful")
            
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
        
    }


        const [posts, setPosts] = useState()

          useEffect ( () => {
              async function getProdutos(db){
            
              const querySnapshot = await getDocs(collection(db, "posts"));
            
              querySnapshot.forEach((doc) => {
                setPosts(doc.data())
              });
            }
              getProdutos(dataBase)
            }, []);


    return(
        <div className="administrador">
            <h1 className="apresentacao">Todos os Posts</h1>

            <ul className="todosPosts">
                {posts && 
                    posts.posts.map( (doc, index) => (
                        <li id={doc.id} key={index}>
                            <div className="title">
                                <div className="titleImg">
                                    <img src="https://static.vecteezy.com/ti/fotos-gratis/t2/17323707-close-up-de-um-reptil-em-um-galho-de-arvore-contra-um-impressionante-papel-de-parede-de-fundo-natural-hd-foto.jpg" alt="" />
                                </div>


                                <h4>{doc.titulo}</h4>
                            </div>
                            
                            <div className="botoes">
                                <button id={doc.id} className="editar">Editar</button>
                                <button id={doc.id} className="excluir">Excluir</button>
                            </div>


                        </li>
                    ))
                }
            </ul>

            <div className="right">
                <button className="sair" onClick={sair}>Sair</button>
                <Link to={"/new"}><button className="criar">Criar Post</button></Link>
            </div>

        </div>
    )
}

export default Admin