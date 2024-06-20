import React from "react";

import {getAuth, onAuthStateChanged } from 'firebase/auth';
import { storage } from "../Home";
import { ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { collection, addDoc,doc, updateDoc, increment} from "firebase/firestore";

import { dataBase } from "../Home";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "./CriarPost.css"

function criarPost(){
    
    const [userLogado, setUserLogado] = useState(false)
    const navigate = useNavigate(); //
    

    useEffect( () => {
        const auth = getAuth(); 
        onAuthStateChanged(auth, (user) => {
        if (user) {
        setUserLogado(true)    

        } else {
            console.log("Ninguem conectado")
            setUserLogado(false)
            navigate("/login")//caso nenhum usuário estiver conectado ira direciona o usuário para a pagina de login

        }
        });
    
    }, [])
    
    //valores
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [conteudo, setConteudo] = useState();
    const [imagem, setImagem] = useState();


    const [imgURL, setImgURL] = useState(""); //URL da imagens
    const [progressPorcent, setPorgessPorcent] = useState(0); //Pegar o progresso

    const handleSubmit = (event) => {
        event.preventDefault(); //não recarregar a pagina ao apertar enviar 
        const file = event.target[3]?.files[0]; // pegar o arquivo do quarto input
        if (!file) return; //se nao tiver nenhuma imagem 
    
        const storageRef = ref(storage, `images/${file.name}`); //referencia
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPorgessPorcent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgURL(downloadURL);
                setImagem(downloadURL)
            });

            
          }
        );
      };


    //   Atualizar um documento a seleção 
    const getAdicionar = () => {
        const teste = doc(dataBase, "posts", "63xCjIWESjdLAi4r5Q0i", "posts");
        updateDoc(teste, {
            nome: increment(titulo)
        });
    }
    

    //   const getAdicionar = () => {
    //     if(titulo && descricao && conteudo && imagem !== ""){
    //         addDoc(collection(dataBase, "posts"), {
    //             nome: titulo,
    //             sobrenome: descricao
    //           });
    //           //zerar os imputs
    //           setTitulo("");
    //           setDescricao("");
    //           setConteudo("");
    //           setImagem("");
    //       };
    //     }




    return(
        <div className="criarPost">
            <form onSubmit={handleSubmit} style={{ display: userLogado != false ? "flex" : "none" }} className="criarPost" action="">
                <h1>Titulo</h1>
                <input onChange={(e) => setTitulo(e.target.value)} type="text" />
            
                <h1>Descrição</h1>
                <input onChange={(e) => setDescricao(e.target.value)} type="text" />

                <h1>Conteúdo</h1>
                <textarea onChange={(e)=> setConteudo(e.target.value)} placeholder="conteudo" id=""></textarea>
            
                <input type="file" />
                {!imgURL && <p>{progressPorcent}%</p>} {/*nao tiver imagem mostrar a barra de prograsso*/} 

                <button onClick={getAdicionar} type="submit">Salvar</button>

                
            </form>

            {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
        </div>
    )
}

export default criarPost