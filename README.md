# 🔐 Sistema de Autenticação Full-Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-green)

🇧🇷 **Português** | 🇺🇸 [English](README.en.md)

Sistema completo de autenticação (login e registro) desenvolvido com **React** no front-end e **Node.js/Express** no back-end, aplicando boas práticas de segurança, como hash de senhas com **bcrypt**, autenticação via **JWT**, cookies **httpOnly** e proteção de rotas.

---

# 📸 Screenshots

| Login | Registro |
| :---: | :---: |
| ![Tela de Login](docs/tela_login.png) | ![Tela de Registro](docs/registrar.png) |

---

# ✨ Funcionalidades

- ✅ Cadastro de novos usuários
- ✅ Login utilizando autenticação via JWT
- ✅ Sessão persistida com cookies `httpOnly`
- ✅ Proteção de rotas privadas (`PrivateRoute`)
- ✅ Logout seguro com remoção do cookie de autenticação
- ✅ Validação personalizada dos formulários
- ✅ Indicador de força da senha em tempo real
- ✅ Mostrar/Ocultar senha com suporte ao teclado
- ✅ Layout responsivo (Desktop, Tablet e Mobile)
- ✅ Correção do autofill dos navegadores (Chrome, Edge e Safari)

---

# 🛠️ Tecnologias

## Front-end

- React
- React Router DOM
- Context API
- React Icons
- CSS3

## Back-end

- Node.js
- Express
- MySQL (`mysql2`)
- bcrypt
- JSON Web Token (JWT)
- cookie-parser
- dotenv
- CORS

---

# 🏗️ Arquitetura

O back-end segue uma arquitetura em camadas, separando responsabilidades entre configuração, regras de negócio, rotas e middlewares.

```text
backend/
├── config/
├── controllers/
├── middleware/
├── routes/
├── package.json
├── .env
└── server.js
```

O front-end organiza os componentes reutilizáveis, o contexto global de autenticação e as páginas da aplicação.

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Login/
│   │   ├── Registrar/
│   │   ├── Shared/
│   │   └── PrivateRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
```

---

# 🔒 Decisões de Segurança

Este projeto implementa diversas práticas recomendadas para autenticação segura.

- 🔐 Senhas armazenadas utilizando **bcrypt**.
- 🛡️ Consultas SQL parametrizadas para prevenir SQL Injection.
- 🍪 Token JWT armazenado em **cookies httpOnly**, evitando acesso via JavaScript.
- 🚫 Cookies configurados com **SameSite=Strict**, reduzindo riscos de ataques CSRF.
- 🔍 Mensagens de erro genéricas durante o login, evitando a enumeração de usuários.
- ✅ Validação da força da senha tanto no front-end quanto no back-end.
- 🔑 Informações sensíveis armazenadas em variáveis de ambiente (`.env`).

---

# 🚀 Como executar o projeto

## Pré-requisitos

- Node.js
- MySQL

---

## 1. Clonar o repositório

```bash
git clone https://github.com/edinho-rep/sistema-login-react-node.git

cd sistema-login-react-node
```

---

## 2. Criar o banco de dados

```sql
CREATE DATABASE matrix;

USE matrix;

CREATE TABLE dados_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Configurar o Back-end

```bash
cd backend

npm install
```

Crie um arquivo chamado **.env** na raiz do diretório **backend**.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=matrix
DB_PORT=3306

PORT=5000

JWT_SECRET=gere_uma_chave_forte
```

Para gerar uma chave segura para o JWT:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Inicie a API:

```bash
npm run dev
```

---

## 4. Configurar o Front-end

```bash
cd frontend

npm install

npm run dev
```

A aplicação ficará disponível em:

**Front-end**

```text
http://localhost:5173
```

**Back-end**

```text
http://localhost:5000
```

---

# 📂 Estrutura do Projeto

```text
sistema-login-react-node
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── docs
│
├── README.md
├── README.en.md
└── LICENSE
```

---

# 🚀 Próximas melhorias

- [ ] Docker
- [ ] Docker Compose
- [ ] GitHub Actions (CI/CD)
- [ ] Testes automatizados
- [ ] Swagger / OpenAPI
- [ ] Refresh Token
- [ ] Recuperação de senha por e-mail
- [ ] Deploy em ambiente Cloud

---

# 📄 Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo **LICENSE** para mais informações.

---

# 👨‍💻 Autor

**Eder Passos**

- LinkedIn: https://www.linkedin.com/in/eder-passos-49493252/