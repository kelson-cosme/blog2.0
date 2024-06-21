import { signOut } from "firebase/auth";
import { auth, dataBase } from "../Home";

import { getDocs, collection} from "firebase/firestore";

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

    const [tituloE, setTituloE] = useState()
    const [descricaoE, setDescricaoE] = useState()
    const [conteudoE, setConteudoE] = useState()
    const [imagemE, setImagemE] = useState()
    const [mostrar, setMostrar] = useState(false)

    function editar(e){
        let identificador = e.target.id
        setTituloE(posts.posts[identificador].titulo) //valor titulo
        setDescricaoE(posts.posts[identificador].descricao)
        setConteudoE(posts.posts[identificador].conteudo)
        setImagemE(posts.posts[identificador].imagem)

        setMostrar(true)

        const abaEditar = document.getElementById("abaEditar")
        // abaEditar.style.transform = "translateX(0)"
    }

    function getEditar(){
        setMostrar(false)

    }

    return(
        <div className="administrador">
            <div style={{ transform: mostrar != false ? "translateX(0)" : "translateX(102%)" }} id="abaEditar" className="abaEditar">
                <button onClick={() => setMostrar(false)} className="fechar">X</button>
                
                <input type="text" value={tituloE} name="" id="" />
                <input type="text" value={descricaoE} name="" id="" />
                <input type="text" value={conteudoE} name="" id="" />
                {/* <img src={imagemE} alt="" /> */}
                <button onClick={getEditar}>Editar</button>
            </div>


            <h1 className="apresentacao">Todos os Posts</h1>

            <ul className="todosPosts">
                {posts && 
                    posts.posts.map( (doc, index) => (
                        <li id={doc.id} key={index}>
                            <div className="title">
                                <div className="titleImg">
                                    <img src={doc.imagem} alt="" />
                                </div>


                                <h4>{doc.titulo}</h4>
                            </div>
                            
                            <div className="botoes">
                                <button  onClick={editar} id={index} className="editar">Editar</button>
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