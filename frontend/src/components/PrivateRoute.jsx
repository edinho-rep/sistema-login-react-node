import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { Children } from "react";

const PrivateRoute = ({ children }) => {
    const { usuario, carregando } = useAuth();

    if (carregando) {
        return <p>Carregando...</p>; // evita "flash" de redirecionamento antes de saber se tá logado
    }

    if (!usuario) {
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default PrivateRoute;