import React from "react";

import {getAuth, onAuthStateChanged } from 'firebase/auth';
import { storage } from "../Home";
import { ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { doc, updateDoc, arrayUnion} from "firebase/firestore";

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
            // Exibir progresso de upload, se necessário
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPorgessPorcent(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("URL da imagem:", downloadURL);
              setImgURL(downloadURL);
              console.log("imgURL atualizado:", imgURL); // Verifica se imgURL foi atualizado corretamente
              await adicionarAoCampoPosts(downloadURL);
            } catch (error) {
              console.error("Erro ao obter o URL da imagem: ", error);
            }
          }
        );
    };


      //adicionar ao compo posts
      const adicionarAoCampoPosts = async () => {
        try {
            const docRef = doc(dataBase, "posts", "63xCjIWESjdLAi4r5Q0i"); // Referência ao documento específico
            await updateDoc(docRef, {
                posts: arrayUnion({
                    titulo: titulo,
                    descricao: descricao,
                    conteudo: conteudo,
                    categoria: "tecnologia",
                    imagem: imgURL
                }) // Adicionando um novo objeto ao array 'posts'
            });
            console.log("Campo 'posts' atualizado com sucesso!");
          } catch (error) {
            console.error("Erro ao atualizar o campo 'posts': ", error);
        }
    };




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

                <button type="submit">Salvar</button>

                
            </form>

            {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
        </div>
    )
}

export default criarPost