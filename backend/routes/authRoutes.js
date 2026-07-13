const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const verificarToken = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/perfil", verificarToken, (req, res) => {
    res.json({ mensagem: "Você está autenticado!", usuario: req.usuario});

});

module.exports = router;