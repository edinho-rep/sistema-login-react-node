const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const SALT_ROUNDS = 10;

const register = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    //Validação de força da senha
    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(!senhaForte.test(senha)) {
        return res.status(400).json({
            erro: "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula e número.",
        });
    }

    try {
        const [existente] = await pool.query(
            "SELECT id from dados_users WHERE email = ?",
            [email]
        );

        if (existente.length > 0) {
            return res.status(409).json({ erro: "E-mail já cadastrado." });
        }

        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

        await pool.query(
            "INSERT INTO dados_users (email, senha) VALUES (?, ?)",
            [email, senhaHash]
        );

        return res.status(201).json({ mensagem: "Usuário criado com sucesso." });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro interno no servidor" });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    try {
        const [rows] = await pool.query(
            "SELECT * FROM dados_users Where email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos." });
        }

        const usuario = rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos." });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            usuario: { id: usuario.id, email: usuario.email },
        });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro interno do servidor." });

    }

};


const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({ mensagem: "Logout realizado com sucesso." });
};

module.exports = { register, login, logout };