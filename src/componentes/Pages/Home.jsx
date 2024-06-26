import "../Pages/Home.css"

import { Link } from "react-router-dom";

import { useEffect, useState } from "react"

import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, startAt} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


import React from "react"

import Navbar from "../NavBar/NavBar";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_ID,
  storageBucket: import.meta.env.VITE_STORAGE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

export const storage = getStorage(app)
export const dataBase = getFirestore(app)
export const auth = getAuth(app);


function Home() {

  const [posts, setPosts] = useState()
  const [tamanho, setTamanho] = useState()

  useEffect ( () => {
    async function getProdutos(db){
  
    const querySnapshot = await getDocs(collection(db, "posts"));
  
    querySnapshot.forEach((doc) => {
      setPosts(doc.data())
      setTamanho(doc.data().posts.length)
    });
  }
    getProdutos(db)

},[]);

  // setTamanho(posts && posts.posts.length)
  return (
    <>
            <Navbar/>

      <h1 className="apresentacao">Nosso Blog</h1>
      <div className="destaque">
        <Link to={`/detalhes/${tamanho - 1}`}>
          <div className="destaqueImg"><img src={posts && tamanho && posts.posts[tamanho - 1].imagem} alt="" /></div>
          <div className="destaqueTexto">
              <p className="categoria">{posts && tamanho && posts.posts[tamanho - 1].categoria}</p>

            <div className="destaqueTitulo">
              <h1>{posts && tamanho && posts.posts[tamanho - 1].titulo}</h1>
              <p>{posts && tamanho && posts.posts[tamanho - 1].descricao}</p>
              
            </div>

            <div className="autor">
              <div className="autorImg"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s" alt="" /></div>
              <p>Nome do autor</p>
            </div>
          </div>
        </Link>
        

      </div>


    <ul className="postagem">


      {posts && 
        posts.posts.map( (doc,index) => (
          <li style={{display: index == tamanho - 1? "none" : "inline-block"}} key={index}>
            <Link to={`/detalhes/${index}`}>
            <div className="postagemImg"> 
              <img src={doc.imagem} alt="" />
            </div>
              <h1>{doc.titulo}</h1> 
              <p className="categoria">{doc.categoria}</p>
              <p>{doc.descricao}</p>
            </Link>
            
          </li>
        ))
      }
    </ul>



      <h1>Teste Home</h1>
    </>
  )
}

export default Home
