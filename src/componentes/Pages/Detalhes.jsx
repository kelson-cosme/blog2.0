import "../Pages/Detalhes.css"


import { useParams} from "react-router-dom"; //parametro da url

import "../Pages/Home.css"

import { useEffect, useState } from "react"

import { initializeApp } from 'firebase/app';
import { getFirestore,addDoc, getDocs, collection, documentId } from "firebase/firestore";

import React from "react"


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


function Detalhes() {
  const { id } = useParams(); //pegar os ids dos posts

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
    <div className="postagens"> 
      <p className="categoria">{posts && posts.posts[id].categoria}</p>
      <h1>{posts && posts.posts[id].titulo}</h1>

      <div className="postagensImg">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknS9XBN_xYlrwQszz68wG_AAYidbcfu3e5g&s" alt="" />
      </div>

      <p>{posts && posts.posts[id].conteudo}</p>
    </div>

  )
}

export default Detalhes
