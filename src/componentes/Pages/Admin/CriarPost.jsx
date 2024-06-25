import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { storage } from "../Home";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { dataBase } from "../Home";
import { useNavigate } from 'react-router-dom';

import "./CriarPost.css";

function CriarPost() {
    const [userLogado, setUserLogado] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLogado(true);
            } else {
                console.log("Ninguem conectado");
                setUserLogado(false);
                navigate("/login");
            }
        });
    }, []);

    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [conteudo, setConteudo] = useState();
    const [imgURL, setImgURL] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
    const [categoria, setCategoria] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        const file = event.target[4]?.files[0];
        if (!file) return;
    
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(// Exibir progresso de upload, se necessário
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
                    setImgURL(downloadURL);
                    console.log("URL da imagem:", downloadURL);
                    await adicionarAoCampoPosts(downloadURL);
                } catch (error) {
                    console.error("Erro ao obter o URL da imagem: ", error);
                }
            }
        );
    };

    const adicionarAoCampoPosts = async (downloadURL) => {
        try {
            const docRef = doc(dataBase, "posts", "63xCjIWESjdLAi4r5Q0i");
            await updateDoc(docRef, {
                posts: arrayUnion({
                    titulo: titulo,
                    descricao: descricao,
                    conteudo: conteudo,
                    categoria: categoria,
                    imagem: downloadURL
                })
            });
            console.log("Campo 'posts' atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o campo 'posts': ", error);
        }
    };

    function escolherCategoria(e){ //va
        setCategoria(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className="criarPost">
            <form onSubmit={handleSubmit} value={categoria} style={{ display: userLogado ? "flex" : "none" }} className="criarPost" action="">

                <input onChange={escolherCategoria} type="text" list="categoria" />
                <datalist id="categoria">
                    <option value="tecnologia"></option>
                    <option value="musica"></option>
                    <option value="outros"></option>
                </datalist>

                <h1>Titulo</h1>
                <input onChange={(e) => setTitulo(e.target.value)} type="text" />
            
                <h1>Descrição</h1>
                <input onChange={(e) => setDescricao(e.target.value)} type="text" />

                <h1>Conteúdo</h1>
                <textarea onChange={(e) => setConteudo(e.target.value)} placeholder="conteudo" id=""></textarea>
            
                <input type="file" />
                {!imgURL && <p>{progressPorcent}%</p>} 

                <button type="submit">Salvar</button>  
            </form>

            {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
        </div>
    );
}

export default CriarPost;