import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../Shared/AuthForm.css";

// Fica AQUI, fora do componente
const calcularForcaSenha = (senha) => {
    let forca = 0;
    if (senha.length >= 8) forca++;
    if (/[a-z]/.test(senha)) forca++;
    if (/[A-Z]/.test(senha)) forca++;
    if (/\d/.test(senha)) forca++;
    if (/[^A-Za-z0-9]/.test(senha)) forca++;

    if (forca <= 2) return { label: "Fraca", cor: "#dc3545" };
    if (forca <= 4) return { label: "Média", cor: "#ffc107" };
    return { label: "Forte", cor: "#28a745" };
};

const Registrar = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro("");
        setSucesso("");

        if (!email || !senha || !confirmarSenha) {
            setErro("Preencha todos os campos para continuar.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!senhaForte.test(senha)) {
            setErro("A senha deve ter pelo menos 8 caracteres, com maiúscula, minúscula e número.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.erro);
                return;
            }

            setSucesso("Conta criada com sucesso! Redirecionando para o login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (erro) {
            console.error("Erro ao conectar com o servidor:", erro);
            setErro("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <form onSubmit={handleSubmit} noValidate>
                    <h1>Criar Conta</h1>

                    {erro && <p className="erro-msg">{erro}</p>}
                    {sucesso && <p className="sucesso-msg">{sucesso}</p>}

                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-field">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
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

                    {senha && (
                        <p style={{ fontSize: "13px", color: calcularForcaSenha(senha).cor, marginTop: "-15px", marginBottom: "15px" }}>
                            Força da senha: {calcularForcaSenha(senha).label}
                        </p>
                    )}

                    <div className="input-field">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Confirmar senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Cadastrar</button>

                    <div className="signup-link">
                        <p>
                            Já tem uma conta? <Link to="/login">Entrar</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registrar;