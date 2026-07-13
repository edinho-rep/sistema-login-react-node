# 🔐 Sistema de Autenticação Full-Stack

Sistema completo de autenticação (login e registro) construído com **React** no front-end e **Node.js/Express** no back-end, com foco em boas práticas de segurança: hash de senhas, autenticação via JWT, cookies `httpOnly` e proteção de rotas.

> 🔗 Repositório: `<link-do-repositorio-aqui>`

---

## 📸 Screenshots

| Login | Registro |
|---|---|
| ![Tela de Login](docs/tela_login.png) | ![Tela de Registro](docs/registrar.png) |

---

## ✨ Funcionalidades

- Cadastro de novos usuários com validação de força de senha (mínimo 8 caracteres, maiúscula, minúscula e número)
- Login com autenticação via **JWT**
- Sessão persistida com segurança via **cookie `httpOnly`** (não acessível via JavaScript, protegendo contra ataques XSS)
- Proteção de rotas no front-end (`PrivateRoute`) — usuários não autenticados são redirecionados automaticamente para o login
- Logout com limpeza segura do cookie de sessão
- Validação de formulário customizada (sem depender apenas do `required` nativo do navegador)
- Indicador de força de senha em tempo real
- Alternância de visibilidade de senha (mostrar/ocultar), acessível via teclado
- Layout responsivo (desktop, tablet e mobile)
- Correção de estilo para autofill do navegador (Chrome/Edge/Safari)

---

## 🛠️ Tecnologias

**Front-end**
- React
- React Router DOM
- Context API (gerenciamento de estado de autenticação)
- React Icons
- CSS puro (glassmorphism, media queries)

**Back-end**
- Node.js
- Express
- MySQL (via `mysql2`, com pool de conexões)
- bcrypt (hash de senhas)
- jsonwebtoken (JWT)
- cookie-parser
- dotenv
- cors

---

## 🏗️ Arquitetura

O back-end segue uma arquitetura em camadas, separando responsabilidades:

```
backend/
├── config/          → conexão com o banco de dados (pool MySQL)
├── controllers/      → lógica de negócio (registro, login, logout)
├── middleware/        → verificação de token JWT (proteção de rotas)
├── routes/           → definição dos endpoints da API
├── .env               → variáveis de ambiente (não versionado)
└── server.js          → ponto de entrada da aplicação
```

O front-end organiza componentes de tela (`components/`), contexto global de autenticação (`context/`) e páginas pós-login (`pages/`):

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login/
│   │   ├── Registrar/
│   │   ├── Shared/         → CSS compartilhado entre Login e Registrar
│   │   └── PrivateRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx  → estado global de autenticação
│   ├── pages/
│   │   └── Home.jsx
│   └── App.jsx
```

---

## 🔒 Decisões de segurança

Alguns pontos que considerei importantes ao construir o projeto:

- **Senhas nunca são salvas em texto puro** — uso `bcrypt` para gerar hash antes de qualquer gravação no banco.
- **Queries parametrizadas** em todas as consultas SQL, evitando SQL Injection.
- **JWT armazenado em cookie `httpOnly`** em vez de `localStorage`, reduzindo a superfície de ataque contra XSS (o token não pode ser acessado via JavaScript no navegador).
- **`sameSite: strict`** no cookie, como camada adicional de proteção contra CSRF.
- **Mensagens de erro genéricas no login** ("e-mail ou senha inválidos"), para não revelar se um e-mail está ou não cadastrado no sistema.
- **Validação de força de senha** tanto no front-end (feedback imediato) quanto no back-end (garantia real — o front-end pode ser contornado por quem chama a API diretamente).
- **Variáveis sensíveis fora do código-fonte**, via `.env`, excluído do controle de versão pelo `.gitignore`.

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando

### 1. Clonar o repositório
```bash
git clone <link-do-repositorio-aqui>
cd <nome-do-repositorio>
```

### 2. Configurar o banco de dados
```sql
CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE dados_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configurar o back-end
```bash
cd backend
npm install
```

Isso instala todas as dependências já listadas no `package.json` do projeto:
- `express`, `mysql2`, `bcrypt`, `dotenv`, `cors`, `jsonwebtoken`, `cookie-parser`
- `nodemon` (dependência de desenvolvimento)

Cria um arquivo `.env` na raiz de `backend/` com o seguinte conteúdo:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=biblioteca
DB_PORT=3306
PORT=5000
JWT_SECRET=gere_uma_chave_forte_aqui
```

> Dica: gere uma chave forte para o JWT com:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

Inicie o servidor:
```bash
npm run dev
```

### 4. Configurar o front-end
```bash
cd frontend
npm install
```

Isso instala todas as dependências já listadas no `package.json` do projeto:
- `react-router-dom` (roteamento e proteção de rotas)
- `react-icons` (ícones usados nos formulários)

Inicie a aplicação:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`, consumindo a API em `http://localhost:5000`.

<details>
<summary>📦 Como o projeto foi criado do zero (referência)</summary>

**Front-end**, criado com Vite:
```bash
npx create-vite .
# framework: React · variante: JavaScript
npm install react-router-dom react-icons
```

**Back-end**, criado manualmente:
```bash
mkdir backend && cd backend
npm init -y
npm install express mysql2 bcrypt dotenv cors jsonwebtoken cookie-parser
npm install -D nodemon
```

</details>

---

## 📌 Próximos passos

- [ ] Recuperação de senha ("Esqueceu sua senha?")
- [ ] Deploy do back-end via systemd (Linux)
- [ ] Testes automatizados (Jest / Supertest)
- [ ] Deploy em produção (front-end e back-end)

---

## 👤 Autor

**Eder G. P.**
Analista de Infraestrutura em transição para Desenvolvimento de Software.
[LinkedIn](#) · [GitHub](#)
