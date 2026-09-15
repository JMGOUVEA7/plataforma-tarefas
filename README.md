# Plataforma de Tarefas

## 1. Descrição Geral

### 1.1 Objetivo do projeto

A **Plataforma de Tarefas** é uma aplicação web desenvolvida para permitir que usuários se cadastrem, realizem login e gerenciem suas próprias tarefas.

O sistema permite:

* Cadastro de novos usuários;
* Autenticação por email e senha;
* Criação de tarefas;
* Listagem das tarefas do usuário autenticado;
* Consulta de uma tarefa específica;
* Atualização do status da tarefa;
* Conclusão de tarefas;
* Exclusão de tarefas;
* Proteção das informações para que cada usuário tenha acesso somente às suas próprias tarefas.

O projeto foi desenvolvido com uma arquitetura separada entre **backend** e **frontend**, utilizando uma API REST para realizar a comunicação entre as duas partes.

### 1.2 Tecnologias utilizadas

#### Backend

* **JavaScript** — linguagem principal do projeto;
* **Node.js** — ambiente de execução do JavaScript no servidor;
* **Express** — framework utilizado para criação da API e gerenciamento das rotas;
* **Prisma ORM** — ferramenta utilizada para comunicação com o banco de dados;
* **PostgreSQL** — banco de dados relacional;
* **bcrypt** — biblioteca utilizada para realizar o hash das senhas;
* **jsonwebtoken (JWT)** — biblioteca utilizada para autenticação;
* **dotenv** — carregamento de variáveis de ambiente;
* **cors** — configuração de comunicação entre frontend e backend;
* **nodemon** — reinicialização automática do servidor durante o desenvolvimento.

#### Frontend

* **React** — biblioteca utilizada para construção da interface;
* **Vite** — ferramenta de criação e execução do projeto React;
* **JavaScript** — linguagem utilizada na lógica da interface;
* **HTML e CSS** — estrutura e estilização das páginas;
* **Fetch API** — comunicação com a API do backend;
* **LocalStorage** — armazenamento local do token de autenticação.

---

## 2. Estrutura de Pastas e Arquivos

A estrutura principal do projeto é organizada da seguinte maneira:

```text
PlataformaTarefas/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── tarefaRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

### 2.1 Backend

O backend é responsável por:

* Receber requisições do frontend;
* Validar os dados enviados;
* Realizar cadastro e login;
* Criar e validar tokens JWT;
* Proteger as rotas privadas;
* Executar operações no banco de dados;
* Retornar respostas em formato JSON.

### 2.2 Frontend

O frontend é responsável por:

* Apresentar as telas da aplicação;
* Permitir cadastro e login;
* Enviar dados para a API;
* Armazenar o token de autenticação;
* Exibir as tarefas do usuário;
* Permitir criar, concluir e excluir tarefas;
* Atualizar a interface sem recarregar a página.

---

## 3. Propósito de Cada Pasta e Arquivo

### 3.1 Backend

#### `backend/prisma/schema.prisma`

Arquivo responsável pela definição da estrutura do banco de dados.

Nele são definidos:

* Os modelos `Usuario` e `Tarefa`;
* Os campos de cada tabela;
* Os tipos de dados;
* As chaves primárias;
* A chave estrangeira entre usuário e tarefa;
* O enum utilizado para representar o status da tarefa;
* As configurações do Prisma e do PostgreSQL.

#### `backend/src/server.js`

É o arquivo principal do servidor.

Suas responsabilidades são:

* Importar as dependências;
* Criar a aplicação Express;
* Habilitar o CORS;
* Permitir o recebimento de dados JSON;
* Registrar as rotas de autenticação;
* Registrar as rotas de tarefas;
* Criar uma rota inicial de teste;
* Iniciar o servidor na porta configurada.

As rotas são registradas da seguinte forma:

```js
app.use("/api/auth", authRoutes);
app.use("/api/tarefas", tarefaRoutes);
```

#### `backend/src/lib/prisma.js`

Responsável por criar e exportar uma instância do `PrismaClient`.

Essa instância é utilizada pelas rotas para acessar o banco de dados PostgreSQL.

Exemplo:

```js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
```

#### `backend/src/middlewares/authMiddleware.js`

Middleware responsável por proteger as rotas privadas.

Ele:

1. Verifica se o cabeçalho `Authorization` foi enviado;
2. Confere se o formato é `Bearer TOKEN`;
3. Valida o token utilizando o segredo definido em `JWT_SECRET`;
4. Obtém o identificador do usuário;
5. Armazena o identificador em `req.usuarioId`;
6. Permite que a requisição continue utilizando `next()`.

O identificador é armazenado da seguinte maneira:

```js
req.usuarioId = decoded.usuarioId;
```

Caso o token não seja informado, seja inválido ou esteja expirado, a API retorna uma resposta de erro com status `401`.

#### `backend/src/routes/authRoutes.js`

Arquivo responsável pelas rotas de autenticação e cadastro de usuários.

Ele contém as rotas:

```text
POST /api/auth/register
POST /api/auth/login
```

#### `backend/src/routes/tarefaRoutes.js`

Arquivo responsável pelo gerenciamento das tarefas.

Ele contém as rotas:

```text
GET    /api/tarefas
GET    /api/tarefas/:id
POST   /api/tarefas
PUT    /api/tarefas/:id
DELETE /api/tarefas/:id
```

Todas essas rotas são protegidas pelo middleware de autenticação.

### 3.2 Frontend

#### `frontend/src/App.jsx`

É o principal componente da aplicação React.

Ele controla:

* A tela atual;
* Os campos de login;
* Os campos de cadastro;
* Os dados da tarefa;
* A lista de tarefas;
* O login do usuário;
* O cadastro de usuários;
* A criação de tarefas;
* A conclusão de tarefas;
* A exclusão de tarefas;
* O logout.

Também utiliza estados do React, como:

```jsx
useState()
```

e o efeito:

```jsx
useEffect()
```

O `useEffect` é utilizado para carregar as tarefas automaticamente quando o usuário entra na tela principal.

#### `frontend/src/main.jsx`

Arquivo responsável por inicializar a aplicação React e renderizar o componente principal no elemento HTML com o identificador `root`.

#### `frontend/src/index.css`

Arquivo responsável pela estilização global da aplicação.

Nele são definidos estilos para:

* Corpo da página;
* Botões;
* Campos de texto;
* Áreas de descrição;
* Formulários;
* Títulos;
* Espaçamentos.

#### `frontend/public/`

Pasta destinada a arquivos públicos e recursos estáticos que podem ser utilizados pelo frontend.

#### `frontend/index.html`

Arquivo HTML principal utilizado pelo Vite para carregar a aplicação React.

#### `package.json`

Arquivo que contém:

* Nome do projeto;
* Versão;
* Scripts de execução;
* Dependências instaladas;
* Configurações do projeto.

---

## 4. Modelagem do Banco de Dados

O banco de dados utilizado é o **PostgreSQL**, acessado por meio do **Prisma ORM**.

A aplicação possui duas entidades principais:

* `Usuario`;
* `Tarefa`.

### 4.1 Tabela `Usuario`

Representa os usuários cadastrados no sistema.

| Campo       | Tipo     | Descrição                           |
| ----------- | -------- | ----------------------------------- |
| `id`        | Integer  | Identificador único do usuário      |
| `nome`      | String   | Nome do usuário                     |
| `email`     | String   | Email do usuário, único no sistema  |
| `senha`     | String   | Senha armazenada em formato de hash |
| `createdAt` | DateTime | Data de criação do cadastro         |

### 4.2 Tabela `Tarefa`

Representa as tarefas criadas pelos usuários.

| Campo       | Tipo            | Descrição                            |
| ----------- | --------------- | ------------------------------------ |
| `id`        | Integer         | Identificador único da tarefa        |
| `titulo`    | String          | Título da tarefa                     |
| `descricao` | String opcional | Descrição da tarefa                  |
| `status`    | StatusTarefa    | Situação atual da tarefa             |
| `usuarioId` | Integer         | Identificador do usuário responsável |
| `createdAt` | DateTime        | Data de criação da tarefa            |
| `updatedAt` | DateTime        | Data da última atualização           |

### 4.3 Enum `StatusTarefa`

O status da tarefa pode assumir dois valores:

```prisma
enum StatusTarefa {
  PENDENTE
  CONCLUIDA
}
```

* `PENDENTE` — tarefa ainda não concluída;
* `CONCLUIDA` — tarefa finalizada.

### 4.4 Relacionamento entre as tabelas

O relacionamento entre `Usuario` e `Tarefa` é de:

```text
Um usuário pode possuir várias tarefas.
Cada tarefa pertence a apenas um usuário.
```

Representação textual:

```text
Usuario
  1
  |
  | possui
  |
  N
Tarefa
```

O relacionamento é realizado pelo campo `usuarioId` da tabela `Tarefa`.

No Prisma:

```prisma
model Usuario {
  id      Int      @id @default(autoincrement())
  nome    String
  email   String   @unique
  senha   String

  tarefas Tarefa[]
}

model Tarefa {
  id        Int      @id @default(autoincrement())
  titulo    String
  descricao String?
  status    StatusTarefa @default(PENDENTE)
  usuarioId Int

  usuario Usuario @relation(
    fields: [usuarioId],
    references: [id],
    onDelete: Cascade
  )
}
```

A opção `onDelete: Cascade` indica que, caso um usuário seja excluído, suas tarefas relacionadas também poderão ser excluídas.

---

## 5. Funções Principais

## 5.1 Módulo de autenticação

### Rota de cadastro

```text
POST /api/auth/register
```

Responsável por cadastrar um novo usuário.

#### Dados esperados

```json
{
  "nome": "José",
  "email": "jose@email.com",
  "senha": "123456"
}
```

#### Funcionamento

1. Recebe nome, email e senha;
2. Verifica se todos os campos foram preenchidos;
3. Verifica se o email já está cadastrado;
4. Gera um hash da senha utilizando `bcrypt`;
5. Salva o usuário no banco de dados;
6. Retorna os dados básicos do usuário cadastrado.

#### Validações realizadas

* Nome obrigatório;
* Email obrigatório;
* Senha obrigatória;
* Email não pode estar duplicado;
* A senha não é armazenada diretamente no banco.

#### Resposta de sucesso

```json
{
  "message": "Usuário cadastrado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
  }
}
```

### Rota de login

```text
POST /api/auth/login
```

Responsável por autenticar um usuário existente.

#### Dados esperados

```json
{
  "email": "jose@email.com",
  "senha": "123456"
}
```

#### Funcionamento

1. Procura o usuário pelo email;
2. Verifica se o usuário existe;
3. Compara a senha informada com o hash armazenado;
4. Gera um token JWT;
5. Retorna o token e os dados básicos do usuário.

O token é criado utilizando:

```js
const token = jwt.sign(
  { usuarioId: usuario.id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
```

O payload do token contém o identificador do usuário:

```json
{
  "usuarioId": 1
}
```

#### Validações realizadas

* Verificação da existência do usuário;
* Comparação segura da senha;
* Retorno de erro para email ou senha inválidos;
* Utilização de segredo definido em variável de ambiente;
* Expiração do token após um dia.

---

## 5.2 Middleware de autenticação

O middleware é utilizado para impedir que usuários não autenticados acessem as rotas de tarefas.

O frontend deve enviar o token no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

O middleware verifica o token e disponibiliza o identificador do usuário em:

```js
req.usuarioId
```

Esse valor é utilizado pelas rotas para garantir que as tarefas sejam associadas ao usuário autenticado.

---

## 5.3 Módulo de tarefas

### Listar tarefas

```text
GET /api/tarefas
```

Retorna todas as tarefas pertencentes ao usuário autenticado.

A consulta utiliza:

```js
where: {
  usuarioId: req.usuarioId
}
```

Dessa forma, um usuário não consegue visualizar tarefas de outros usuários.

As tarefas são ordenadas pela data de criação, da mais recente para a mais antiga.

### Buscar tarefa por ID

```text
GET /api/tarefas/:id
```

Retorna uma tarefa específica.

Exemplo:

```text
GET /api/tarefas/4
```

Antes de retornar a tarefa, a API verifica:

* Se o ID é válido;
* Se a tarefa existe;
* Se a tarefa pertence ao usuário autenticado.

A consulta utiliza:

```js
const tarefa = await prisma.tarefa.findFirst({
  where: {
    id,
    usuarioId: req.usuarioId
  }
});
```

Se a tarefa não pertencer ao usuário, a API retorna:

```json
{
  "message": "Tarefa não encontrada"
}
```

### Criar tarefa

```text
POST /api/tarefas
```

Cria uma nova tarefa para o usuário autenticado.

#### Dados esperados

```json
{
  "titulo": "Estudar React",
  "descricao": "Revisar useState e useEffect"
}
```

O `usuarioId` não é enviado pelo frontend. Ele é obtido do token validado pelo middleware.

A criação utiliza:

```js
const tarefa = await prisma.tarefa.create({
  data: {
    titulo,
    descricao,
    usuarioId: req.usuarioId
  }
});
```

#### Validações realizadas

* O título é obrigatório;
* O usuário precisa estar autenticado;
* O usuário da tarefa é obtido pelo token;
* O status inicial é definido como `PENDENTE` pelo banco.

### Atualizar tarefa

```text
PUT /api/tarefas/:id
```

Atualiza os dados de uma tarefa existente.

Exemplo:

```text
PUT /api/tarefas/4
```

Dados enviados:

```json
{
  "titulo": "Estudar React",
  "descricao": "Revisar hooks do React",
  "status": "CONCLUIDA"
}
```

Antes de atualizar, a API verifica se a tarefa pertence ao usuário autenticado.

O sistema permite atualizar:

* Título;
* Descrição;
* Status.

Os valores válidos para o status são:

```text
PENDENTE
CONCLUIDA
```

### Excluir tarefa

```text
DELETE /api/tarefas/:id
```

Exclui uma tarefa específica.

Antes da exclusão, a API verifica:

* Se o ID é válido;
* Se a tarefa existe;
* Se a tarefa pertence ao usuário autenticado.

A exclusão é realizada somente após essas verificações.

---

## 6. Segurança Aplicada

### 6.1 Hash de senhas

As senhas dos usuários não são armazenadas diretamente no banco de dados.

Durante o cadastro, a senha é transformada em um hash utilizando a biblioteca `bcrypt`:

```js
const senhaHash = await bcrypt.hash(senha, 10);
```

No login, a senha informada é comparada com o hash armazenado:

```js
const senhaValida = await bcrypt.compare(
  senha,
  usuario.senha
);
```

Dessa forma, o sistema não precisa armazenar a senha original do usuário.

### 6.2 Proteção de rotas privadas

As rotas de tarefas utilizam o middleware:

```js
router.use(autenticar);
```

Isso significa que todas as rotas desse arquivo exigem um token JWT válido.

Caso o token não seja enviado ou seja inválido, o usuário recebe uma resposta de erro:

```json
{
  "erro": "Token inválido ou expirado"
}
```

### 6.3 Controle de acesso por usuário

Cada tarefa é vinculada ao usuário que a criou por meio do campo `usuarioId`.

As consultas utilizam simultaneamente:

```js
where: {
  id,
  usuarioId: req.usuarioId
}
```

Isso impede que um usuário consiga acessar, atualizar ou excluir uma tarefa pertencente a outra pessoa.

O ID da tarefa, sozinho, não é suficiente para autorizar uma operação.

### 6.4 Validação de entrada

O sistema realiza validações básicas nos dados recebidos.

Exemplos:

* Verificação de campos obrigatórios;
* Verificação de email duplicado;
* Verificação de ID numérico;
* Verificação da existência da tarefa;
* Verificação do status enviado;
* Verificação da autenticação do usuário.

A API também utiliza consultas do Prisma, que realizam o tratamento dos parâmetros de forma estruturada, reduzindo riscos de SQL Injection.

### 6.5 Proteção contra SQL Injection

O acesso ao banco é realizado pelo Prisma ORM.

As consultas são construídas utilizando métodos do Prisma, como:

```js
prisma.usuario.findUnique()
prisma.tarefa.findMany()
prisma.tarefa.create()
prisma.tarefa.update()
prisma.tarefa.delete()
```

Dessa forma, os dados recebidos não são concatenados diretamente em comandos SQL.

### 6.6 Proteção contra exposição de senhas

Nas respostas de cadastro e login, o sistema retorna somente:

* ID;
* Nome;
* Email.

A senha, mesmo em formato de hash, não é enviada ao frontend.

### 6.7 Variáveis de ambiente

Informações importantes, como a conexão com o banco e o segredo JWT, são armazenadas em variáveis de ambiente.

Exemplo de arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/plataforma_tarefas"
JWT_SECRET="uma_chave_secreta_segura"
PORT=3000
```

O arquivo `.env` não deve ser enviado para repositórios públicos.

### 6.8 Tratamento de erros

As operações do backend utilizam blocos `try/catch`.

Quando ocorre um problema, a API retorna uma mensagem clara ao cliente.

Exemplo:

```json
{
  "message": "Erro ao criar tarefa"
}
```

Também são utilizados códigos HTTP adequados:

| Código | Significado                               |
| ------ | ----------------------------------------- |
| `200`  | Operação realizada com sucesso            |
| `201`  | Registro criado com sucesso               |
| `400`  | Dados inválidos ou ausentes               |
| `401`  | Usuário não autenticado ou token inválido |
| `404`  | Registro não encontrado                   |
| `500`  | Erro interno do servidor                  |

---

## 7. Instruções de Instalação

### 7.1 Pré-requisitos

Antes de executar o projeto, é necessário instalar:

* Node.js;
* npm;
* PostgreSQL;
* Git, caso o projeto seja obtido por um repositório.

Também é necessário possuir um banco de dados PostgreSQL criado para a aplicação.

### 7.2 Instalar as dependências do backend

No terminal, entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Caso ainda não tenha instalado as bibliotecas principais:

```bash
npm install express cors dotenv bcrypt jsonwebtoken @prisma/client
```

Instale as dependências de desenvolvimento:

```bash
npm install --save-dev nodemon
```

### 7.3 Configurar o arquivo `.env`

Dentro da pasta `backend`, crie um arquivo chamado:

```text
.env
```

Adicione:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
JWT_SECRET="chave_secreta_do_projeto"
PORT=3000
```

Substitua os valores pelos dados do PostgreSQL instalado localmente.

### 7.4 Configurar o Prisma

Na pasta `backend`, execute:

```bash
npx prisma generate
```

Depois, execute a migração:

```bash
npx prisma migrate dev --name init
```

Esse comando cria as tabelas no banco de dados conforme o arquivo `schema.prisma`.

---

## 8. Como Rodar o Backend Localmente

Entre na pasta do backend:

```bash
cd backend
```

Execute:

```bash
npm run dev
```

O servidor será iniciado na porta `3000`.

Mensagem esperada:

```text
Servidor rodando na porta 3000
```

A API poderá ser acessada em:

```text
http://localhost:3000
```

Para testar se o servidor está funcionando, acesse:

```text
http://localhost:3000/
```

A resposta esperada é:

```json
{
  "message": "API funcionando!"
}
```

---

## 9. Como Rodar o Frontend Localmente

Abra outro terminal e entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite exibirá um endereço semelhante a:

```text
http://localhost:5173
```

Abra esse endereço no navegador.

É necessário manter o backend e o frontend executando simultaneamente:

### Terminal 1

```bash
cd backend
npm run dev
```

### Terminal 2

```bash
cd frontend
npm run dev
```

---

## 10. Arquitetura da Aplicação

A aplicação utiliza uma arquitetura dividida em camadas:

```text
┌──────────────────────────────┐
│          Frontend            │
│       React + Vite           │
└──────────────┬───────────────┘
               │
               │ Requisições HTTP
               │ JSON + Bearer Token
               ▼
┌──────────────────────────────┐
│           Backend            │
│       Node.js + Express      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Middleware JWT         │
│   Validação do usuário       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          Prisma ORM          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         PostgreSQL           │
└──────────────────────────────┘
```

### 10.1 Fluxo de cadastro

```text
Usuário preenche o cadastro
          ↓
Frontend envia os dados
          ↓
POST /api/auth/register
          ↓
Backend valida os campos
          ↓
Verifica se o email já existe
          ↓
Gera o hash da senha
          ↓
Salva o usuário no PostgreSQL
          ↓
Retorna uma mensagem de sucesso
```

### 10.2 Fluxo de login

```text
Usuário informa email e senha
          ↓
Frontend envia os dados
          ↓
POST /api/auth/login
          ↓
Backend busca o usuário
          ↓
bcrypt compara a senha
          ↓
JWT é criado
          ↓
Token é enviado ao frontend
          ↓
Frontend armazena o token no LocalStorage
```

### 10.3 Fluxo de acesso às tarefas

```text
Usuário acessa a tela de tarefas
          ↓
Frontend recupera o token
          ↓
Envia o token no cabeçalho Authorization
          ↓
Middleware valida o JWT
          ↓
req.usuarioId recebe o ID do usuário
          ↓
Rota consulta somente tarefas desse usuário
          ↓
Prisma acessa o PostgreSQL
          ↓
Backend retorna as tarefas
          ↓
React atualiza a interface
```

### 10.4 Fluxo de criação de tarefa

```text
Usuário preenche título e descrição
          ↓
Frontend envia POST /api/tarefas
          ↓
Token é enviado no cabeçalho
          ↓
Middleware identifica o usuário
          ↓
Backend valida o título
          ↓
Prisma cria a tarefa
          ↓
usuarioId é definido pelo token
          ↓
Frontend atualiza a lista
```

---

## 11. Rotas da API

| Método   | Rota                 | Descrição                          | Autenticação |
| -------- | -------------------- | ---------------------------------- | ------------ |
| `GET`    | `/`                  | Verifica se a API está funcionando | Não          |
| `POST`   | `/api/auth/register` | Cadastra um usuário                | Não          |
| `POST`   | `/api/auth/login`    | Realiza o login                    | Não          |
| `GET`    | `/api/tarefas`       | Lista as tarefas do usuário        | Sim          |
| `GET`    | `/api/tarefas/:id`   | Busca uma tarefa específica        | Sim          |
| `POST`   | `/api/tarefas`       | Cria uma nova tarefa               | Sim          |
| `PUT`    | `/api/tarefas/:id`   | Atualiza uma tarefa                | Sim          |
| `DELETE` | `/api/tarefas/:id`   | Exclui uma tarefa                  | Sim          |

---

## 12. Exemplo de Uso da API

### Cadastro

```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json
```

```json
{
  "nome": "José",
  "email": "jose@email.com",
  "senha": "123456"
}
```

### Login

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json
```

```json
{
  "email": "jose@email.com",
  "senha": "123456"
}
```

### Listagem de tarefas

```http
GET http://localhost:3000/api/tarefas
Authorization: Bearer SEU_TOKEN
```

### Criação de tarefa

```http
POST http://localhost:3000/api/tarefas
Authorization: Bearer SEU_TOKEN
Content-Type: application/json
```

```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Revisar rotas e middlewares"
}
```

### Conclusão de tarefa

```http
PUT http://localhost:3000/api/tarefas/1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json
```

```json
{
  "status": "CONCLUIDA"
}
```

### Exclusão de tarefa

```http
DELETE http://localhost:3000/api/tarefas/1
Authorization: Bearer SEU_TOKEN
```

---

## 13. Considerações Finais

A Plataforma de Tarefas demonstra a integração entre frontend, backend e banco de dados em uma aplicação web completa.

O React é responsável pela interface e pela interação com o usuário, enquanto o Node.js e o Express disponibilizam a API responsável pelas regras de negócio. O Prisma realiza a comunicação com o PostgreSQL, e o JWT garante que somente usuários autenticados possam acessar e manipular suas tarefas.

A aplicação também implementa medidas de segurança, como hash de senhas, proteção de rotas privadas, validação de dados, controle de acesso por usuário e tratamento de erros.

Foi utilizado ChatGPT no desenvolvimento da Plataforma de Tarefas, fazendo o planejamento da plataforma e contribuindo para a criação e organização do backend e do frontend. Auxílio na configuração do Node.js, Express, Prisma e PostgreSQL, na implementação das rotas de cadastro, login e gerenciamento de tarefas, além da integração com o React. Também nos testes da aplicação, da correção de erros e da implementação da autenticação com JWT e do controle de acesso às tarefas de cada usuário.
