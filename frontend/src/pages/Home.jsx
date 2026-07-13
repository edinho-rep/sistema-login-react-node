import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="home-page">
            <h1>Bem-vindo!</h1>
            <p>Login realizado com sucesso.</p>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Home;