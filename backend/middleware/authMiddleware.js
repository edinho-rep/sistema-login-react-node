const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido."});
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, decoded) =>{
        if (erro) {
            return res.status(403).json({ erro: "Token inválido ou expirado."});
        }
        req.usuario = decoded;
        next();
    });


};

module.exports = verificarToken;