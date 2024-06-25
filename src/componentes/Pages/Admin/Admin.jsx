import { signOut } from "firebase/auth";
import { auth, dataBase } from "../Home";

import { getDocs, collection, doc, arrayRemove, arrayUnion, updateDoc  } from "firebase/firestore";

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
        const [att, setAtt] = useState()

          useEffect ( () => {
              async function getProdutos(db){
            
              const querySnapshot = await getDocs(collection(db, "posts"));
            
              querySnapshot.forEach((doc) => {
                setPosts(doc.data())
                setAtt("")
            });

            }
              getProdutos(dataBase)
            }, [att]);

    const [tituloE, setTituloE] = useState()
    const [descricaoE, setDescricaoE] = useState()
    const [conteudoE, setConteudoE] = useState()
    const [imagemE, setImagemE] = useState()
    const [mostrar, setMostrar] = useState(false)
    const [identificador, setIdentificador] = useState()

    function editar(e){
        setIdentificador(e.target.id)
        let id = e.target.id
        setTituloE(posts.posts[id].titulo) //valor titulo
        setDescricaoE(posts.posts[id].descricao)
        setConteudoE(posts.posts[id].conteudo)
        setImagemE(posts.posts[id].imagem)

        setMostrar(true)
    }

    async function getEditar() {
        setMostrar(false);
        console.log(identificador)
        const postRef = doc(dataBase, "posts", "63xCjIWESjdLAi4r5Q0i");
        const updatedPost = {
            titulo: tituloE,
            descricao: descricaoE,
            conteudo: conteudoE,
            imagem: imagemE // caso tenha imagem
        };
    
        // para Excluir tera que apagar e adicionar novamente

        //apagando
        await updateDoc(postRef, {
            posts: arrayRemove( posts && posts.posts[identificador])
        });
        // adicionando
        await updateDoc(postRef, {
            posts: arrayUnion(updatedPost)
        });
    
    }

    async function excluirCampo(index) {
        const post = posts.posts[index];
        const postRef = doc(dataBase, "posts", "63xCjIWESjdLAi4r5Q0i");

        // alerta
        let confirmacao= confirm("Tem certeza que quer excluir esse post?") //confirmar que o post seja excluido ou não

        if(confirmacao == true){ 
            // Remova o objeto específico do array
            await updateDoc(postRef, {
                posts: arrayRemove(post)
            });
            setAtt("att") //renderizar a pagina após mudar o valor
        }
    }

    return(
        <div className="administrador">
            <div style={{ transform: mostrar != false ? "translateX(0)" : "translateX(102%)" }} id="abaEditar" className="abaEditar">
                <button onClick={() => setMostrar(false)} className="fechar">X</button>
                
                <input type="text" onChange={(e) => setTituloE(e.target.value)} value={tituloE} name="" id="" />
                <input type="text" onChange={(e) => setDescricaoE(e.target.value)} value={descricaoE} name="" id="" />
                <input type="text" onChange={(e) => setConteudoE(e.target.value)} value={conteudoE} name="" id="" />
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
                                <button  onClick={() => excluirCampo(index)} id={doc.id} className="excluir">Excluir</button>
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