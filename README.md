# React + Vite

## 💻Painel Administrativo para Gerenciamento de Posts

Este projeto é um Painel Administrativo construído com ReactJs e Firebase. Ele permite que um administrador gerencie posts, incluindo a criação, edição e exclusão de posts. Os posts são buscados e atualizados em tempo real a partir de um banco de dados Firestore.

## Funcionalidades
* Autenticação de Usuário: Funcionalidade de login e logout usando Firebase Authentication.
* Visualizar Posts: Exibir todos os posts buscados do Firestore.
* Criar Post: Redirecionar para um formulário para criar um novo post.
* Editar Post: Atualizar o título, descrição, conteúdo de um post existente.
* Excluir Post: Remover um post do Firestore.
* Atualizações em Tempo Real: Atualizar automaticamente a lista de posts quando alterações são feitas.
* Tecnologias Utilizadas
* React: Framework de frontend.
* Firebase: Backend como serviço (BaaS) para autenticação e Firestore para banco de dados.
* CSS: Estilização dos componentes.



## Instalação
1 Clone o repositório:
* git clone https://github.com/kelson-cosme/blog2.0.git
* cd blog2.0

2 Instale as dependências:
* npm install
* npm i firebase

3 Configuração do Firebase:

* Crie um projeto no Firebase.
* Configure a autenticação com email e senha no Firebase Authentication.
* Crie um banco de dados Firestore e adicione uma coleção chamada "posts".
* Obtenha as credenciais do Firebase e adicione-as em um arquivo .env na raiz do projeto:
 
VITE_API_KEY=seusdados <br>
VITE_AUTH=seusdados <br>
VITE_ID=seusdados <br>
VITE_STORAGE=seusdados

## Inicie o servidor de desenvolvimento:
npm run dev

## Uso
### Usuário para teste: login: teste@gmail.com, senha: 123456
Login: Entre com suas credenciais de administrador. <br>
Visualizar Posts: Veja todos os posts listados. <br>
Criar Post: Clique em "Criar Post" para adicionar um novo post. <br>
Editar Post: Clique no botão "Editar" para modificar um post existente. <br>
Excluir Post: Clique no botão "Excluir" para remover um post.



### Proximas atualizações
* Trocar a foto no editar
* style para o mobile
  




- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
