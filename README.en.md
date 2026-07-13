# 🔐 Full-Stack Authentication System

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql\&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-green)

🇺🇸 **English** | 🇧🇷 [Português](README.md)

A complete authentication system built with **React** on the front end and **Node.js/Express** on the back end, following security best practices such as password hashing with **bcrypt**, **JWT** authentication, secure **httpOnly** cookies, and protected routes.

---

# 📸 Screenshots

|                 Login                |                Register                |
| :----------------------------------: | :------------------------------------: |
| ![Login Screen](docs/tela_login.png) | ![Register Screen](docs/registrar.png) |

---

# ✨ Features

* ✅ User registration
* ✅ JWT-based authentication
* ✅ Persistent sessions using secure `httpOnly` cookies
* ✅ Protected routes (`PrivateRoute`)
* ✅ Secure logout by removing the authentication cookie
* ✅ Custom form validation
* ✅ Real-time password strength indicator
* ✅ Show/Hide password with keyboard accessibility
* ✅ Responsive layout (Desktop, Tablet, and Mobile)
* ✅ Browser autofill fixes (Chrome, Edge, and Safari)

---

# 🛠️ Technologies

## Front-end

* React
* React Router DOM
* Context API
* React Icons
* CSS3

## Back-end

* Node.js
* Express
* MySQL (`mysql2`)
* bcrypt
* JSON Web Token (JWT)
* cookie-parser
* dotenv
* CORS

---

# 🏗️ Architecture

The back end follows a layered architecture, separating configuration, business logic, routes, and middleware.

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

The front end is organized into reusable components, a global authentication context, and application pages.

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Login/
│   │   ├── Register/
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

# 🔒 Security

This project implements several security best practices for authentication.

* 🔐 Passwords are hashed using **bcrypt**.
* 🛡️ Parameterized SQL queries help prevent SQL Injection.
* 🍪 JWT tokens are stored in secure **httpOnly** cookies instead of `localStorage`.
* 🚫 Cookies are configured with **SameSite=Strict** to reduce CSRF risks.
* 🔍 Generic login error messages help prevent user enumeration.
* ✅ Password validation is performed on both the client and server sides.
* 🔑 Sensitive information is stored in environment variables (`.env`).

---

# 🚀 Getting Started

## Prerequisites

* Node.js
* MySQL

---

## 1. Clone the repository

```bash
git clone https://github.com/edinho-rep/sistema-login-react-node.git

cd sistema-login-react-node
```

---

## 2. Create the database

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

## 3. Configure the Back-end

```bash
cd backend

npm install
```

Create a **.env** file inside the **backend** directory.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=matrix
DB_PORT=3306

PORT=5000

JWT_SECRET=generate_a_secure_key
```

Generate a secure JWT key:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Start the API:

```bash
npm run dev
```

---

## 4. Configure the Front-end

```bash
cd frontend

npm install

npm run dev
```

The application will be available at:

**Front-end**

```text
http://localhost:5173
```

**Back-end**

```text
http://localhost:5000
```

---

# 📂 Project Structure

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

# 🚀 Future Improvements

* [ ] Docker
* [ ] Docker Compose
* [ ] GitHub Actions (CI/CD)
* [ ] Automated Tests
* [ ] Swagger / OpenAPI
* [ ] Refresh Token
* [ ] Password Recovery via Email
* [ ] Cloud Deployment

---

# 📄 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for more information.

---

# 👨‍💻 Author

**Eder Passos**

* LinkedIn: https://www.linkedin.com/in/eder-passos-49493252/
