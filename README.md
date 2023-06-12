# README - Meu Projeto Vue.js + Vite.js

Este é o README para o seu projeto desenvolvido com Vue.js + Vite.js, usando Vue Router, BEM CSS e Axios para consumo de API.

## Descrição do Projeto

O objetivo deste projeto é criar uma aplicação web utilizando as tecnologias Vue.js e Vite.js. A aplicação faz uso do Vue Router para criar rotas e navegação dentro da aplicação, seguindo as melhores práticas de organização de código e estruturação do projeto com BEM CSS. Além disso, o Axios é utilizado para realizar chamadas a uma API externa e consumir dados.

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado o Node.js e o npm (Node Package Manager) em sua máquina. Certifique-se de ter uma versão compatível instalada.

## Instalação

Siga os passos abaixo para instalar e executar o projeto em seu ambiente local:

1. Clone o repositório do projeto para o seu diretório local:

```
git clone https://github.com/edurojasDev/thera-app.git
```

2. Acesse o diretório do projeto:

```
cd seu-projeto
```

3. Instale as dependências do projeto usando o npm:

```
npm install
```

4. Inicie a aplicação em modo de desenvolvimento:

```
npm run dev
```

5. Abra o seu navegador e acesse a URL `http://localhost:5173` para visualizar a aplicação em execução.

- A pasta `src` é onde se encontra a maior parte do código-fonte do projeto:
  - `assets`: Contém arquivos estáticos, como imagens ou arquivos CSS. Aqui é onde você encontrará o arquivo `main.css`, onde é recomendado utilizar a metodologia BEM CSS para organizar seus estilos.
  - `components`: Pasta destinada aos componentes Vue.js reutilizáveis da aplicação.
  - `router`: Aqui está o arquivo `index.js`, onde são definidas as rotas da aplicação utilizando o Vue Router.
  - `api`: Pasta para armazenar os serviços relacionados à API, contendo o arquivo, onde são definidas as chamadas para a API utilizando o Axios.
  - `views`: Pasta para as views da aplicação, que são os componentes principais renderizados em cada rota.

- O arquivo `App.vue` é o componente raiz da aplicação, que envolve todos os outros componentes.

- O arquivo `main.js` é
