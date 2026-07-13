import { createContext, useContext, useState, useEffect } from "react";
import { Children } from "react";

const AuthContext = createContext(null);

const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true); // true enquanto checa o cookie na primeira carga

    // Roda uma vez, quando a aplicação carrega — pergunta pro backend se o cookie ainda é válido
    useEffect(() => {
        const verificarSessao = async () => {
            try {
                const response = await fetch(`${API_URL}/perfil`, {
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuario(data.usuario);
                } else {
                    setUsuario(null);
                }
            } catch (erro) {
                console.error("Erro ao verificar sessão:", erro);
                setUsuario(null);
            } finally {
                setCarregando(false);
            }
        };

        verificarSessao();
    }, []);

    const login = async (email, senha) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.erro || "Erro ao fazer login.");
        }

        setUsuario(data.usuario);
        return data;
    };

    const logout = async () => {
        await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado — deixa mais limpo usar o contexto nos componentes
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
    }
    return context;
};
