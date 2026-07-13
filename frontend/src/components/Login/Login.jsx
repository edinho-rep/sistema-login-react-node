import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "../Shared/AuthForm.css"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro("");

        if (!username || !password) {
            setErro("Preencha e-mail e senha para continuar.");
            return;
        }

        try {
            await login(username, password);
            navigate("/dashboard");
        } catch (erro) {
            setErro(erro.message);
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <form onSubmit={handleSubmit} noValidate>
                    <h1>Login</h1>

                    {erro && <p className="erro-msg">{erro}</p>}

                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-field">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="icon icon-toggle"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="recall-forget">
                        <label>
                            <input type="checkbox" />
                            Lembre de mim
                        </label>
                        <a href="#">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="signup-link">
                        <p>
                            Não tem uma conta? <Link to="/registrar">Registrar</Link>{" "}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;