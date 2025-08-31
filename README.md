
# Case Prático AutoU - Desenvolvimento
[![Build Passed](https://img.shields.io/badge/build-passing-brightgreen)]

## Sumário

- [Objetivo](#Objetivo)
- [Apresentação](#Apresentação-do-projeto)
- [Apresentação](#Apresentação-do-projeto)
- [Repositorio](#Repositorio-do-Model)
- [Como instalar](#Como-instalar)
- [Como inicializar o sistema](#Como-inicializar-o-sistema)
- [Endpoints](#Endpoints)
- [Dependências do Projeto](#Dependências-do-Projeto)
- [Tecnologias](#Tecnologias)
- [Ferramentas de Desenvolvimento](#Ferramentas-de-Desenvolvimento)
## Objetivo

O desafio consiste em desenvolver uma aplicação web simples capaz de classificar emails em produtivos ou improdutivos e sugerir respostas automáticas utilizando inteligência artificial. O objetivo é automatizar a triagem de emails, liberando tempo da equipe e melhorando a eficiência no atendimento.

## Apresentação do projeto

Video no youtube: [video](https://youtu.be/AQ8fTMQAGcM)

## Repositorio do Model

Repositorio: https://github.com/MrigortBr/Training-hugging-face

## Como instalar

1. git clone https://github.com/MrigortBr/Productive-Email.git
2. cd ./Productive-Email
3. Alterar variaves de ambiente caso deseje. Ex: Tipo do banco de dados.
4. pip install -r requirements.txt **ou** python3 -m pip install -r requirements.txt
5. python app.py ou flask run.



    
## Como inicializar o sistema

O Projeto pode ser acessado após realizar o passo a passo informado anteriormente **ou** acessando o link hospedado do projeto [link](https://re3uoem493.execute-api.sa-east-1.amazonaws.com/)
## Endpoints

Para utilizar de forma mais rapida todos os endpoints basta utilizar a [base](https://github.com/MrigortBr/Productive-Email/blob/dev/api_collection.json) para o [postman](https://www.postman.com/downloads/).


- **Pegar Index.html**
  - **Descrição:** Retorna o HTML inicial da aplicação.
  - **Método HTTP:** GET
  - **Endpoint:** `/`
  - **Link em Nuvem:**: [link](https://re3uoem493.execute-api.sa-east-1.amazonaws.com/)
  - **Headers:**
    - `token`: *JWT de autenticação*
  - **Exemplo de Corpo da Requisição:**
    ```json
    {
      "link": "github.com/MrigortBr",
      "customurl": "cod"
    }
    ```

---

- **Status API**
  - **Descrição:** Verifica o status da API.
  - **Método HTTP:** GET
  - **Endpoint:** `/api`
  - **Link em Nuvem:**: [link](https://re3uoem493.execute-api.sa-east-1.amazonaws.com/api/)

---

- **Listar Emails**
  - **Descrição:** Lista os emails processados pelo sistema.
  - **Método HTTP:** GET
  - **Endpoint:** `/api/listen`
  - **Link em Nuvem:**: [link](https://re3uoem493.execute-api.sa-east-1.amazonaws.com/api/listen/)
  

---

- **Enviar Emails**
  - **Descrição:** Faz upload de um arquivo de email (PDF ou TXT) para processamento.
  - **Método HTTP:** POST
  - **Endpoint:** `/api/upload`
  - **Exemplo de Corpo da Requisição (form-data):**
    - `file`: Arquivo (`.pdf` ou `.txt`)

---

- **Gerar nova resposta**
  - **Descrição:** Gera uma nova resposta sugerida para um email específico.
  - **Método HTTP:** PATCH
  - **Endpoint:** `/api/newresponse`
  - **Exemplo de Corpo da Requisição:**
    ```json
    {
      "id": 1,
      "message": "Olá pessoal, Desejo a todos vocês um Feliz Natal e um próspero Ano Novo! Que 2025 seja repleto de sucesso e muitas conquistas para a equipe da AutoU. Abraços!"
    }
    ```

---

- **Marcar email como enviado**
  - **Descrição:** Marca um email como já enviado ou desmarca o envio.
  - **Método HTTP:** PATCH
  - **Endpoint:** `/api/marksent/{id}`
  - **Parâmetros de Caminho:**
    - `id`: ID do email a ser marcado ou desmarcado
## Dependências do Projeto

- **Flask**: Framework web em Python para criação de APIs e aplicações web.  
- **Flask-CORS**: Extensão do Flask para habilitar CORS (Cross-Origin Resource Sharing).  
- **Peewee**: ORM (Object Relational Mapper) simples e eficiente para bancos de dados relacionais.  
- **Python-Dotenv**: Biblioteca para carregar variáveis de ambiente a partir de arquivos `.env`.  
- **Werkzeug**: Toolkit WSGI usado pelo Flask para lidar com requisições e respostas HTTP.  
- **Transformers**: Biblioteca da Hugging Face para NLP, incluindo modelos pré-treinados de linguagem.  
- **Torch (PyTorch)**: Framework de machine learning utilizado para treinar e executar modelos de IA.  
- **PyPDF2**: Biblioteca para leitura, manipulação e extração de dados de arquivos PDF.  
- **Axios (CDN)**: Biblioteca JavaScript para realizar requisições HTTP no frontend.  

## Tecnologias

- **Java**: Linguagem de programação principal.
- **Html5**: Linguagem de Marcação para criação do front-end.
- **JavaScript**: Linguagem de programação utilizada para scripts do front.
- **Css**: Linguagem usada para estilizar o front-end.
- **Pip**: Gerenciador de dependências e construção de projetos.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- **Sqlite**: Sistema de gerenciamento de banco de dados.
## Ferramentas de Desenvolvimento

- **Postman**: Ferramenta para testar APIs.
- **Spring Tool Suite**: IDE baseada em Eclipse para desenvolvimento Spring.
- **DBeaver**: Ferramenta de administração de banco de dados universal e gratuita.
