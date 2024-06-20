import "../Pages/Home.css"

import { Link } from "react-router-dom";

import { useEffect, useState } from "react"

import { initializeApp } from 'firebase/app';
import { getFirestore,addDoc, getDocs, collection, documentId } from "firebase/firestore";

import React from "react"

import Navbar from "../NavBar/NavBar";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

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

export const dataBase = getFirestore(app)
export const auth = getAuth(app);



function Home() {

  const [posts, setPosts] = useState()

  useEffect ( () => {
    async function getProdutos(db){
  
    const querySnapshot = await getDocs(collection(db, "posts"));
  
    querySnapshot.forEach((doc) => {
      setPosts(doc.data())
    });
  }
    getProdutos(db)
  }, []);



  return (
    <>
            <Navbar/>

      <h1 className="apresentacao">Nosso Blog</h1>
      <div className="destaque">
        <Link to={"/detalhes/0"}>
          <div className="destaqueImg"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknS9XBN_xYlrwQszz68wG_AAYidbcfu3e5g&s" alt="" /></div>

          <div className="destaqueTexto">
              <p className="categoria">{posts && posts.posts[0].categoria}</p>
            
            <div className="destaqueTitulo">
              <h1>{posts && posts.posts[0].titulo}</h1>
              <p>{posts && posts.posts[0].descricao}</p>
              
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
        posts.posts.map( (doc) => (
          <li>
            <Link to={`/detalhes/${doc.id}`}>
              <img src="https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027-1024x683.jpg" alt="" />
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
