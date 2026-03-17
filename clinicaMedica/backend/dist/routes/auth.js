"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
const usuarios = [];
router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    const usuario = await User_1.User.create({
        nome,
        email,
        senha,
    });
    res.json({
        mensagem: 'Usuário criado',
        usuario,
    });
});
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await User_1.User.findOne({
        email,
        senha,
    });
    if (!usuario) {
        return res.status(401).json({
            mensagem: 'Email ou senha inválidos',
        });
    }
    const token = jsonwebtoken_1.default.sign({ email: usuario.email }, 'segredo-super', {
        expiresIn: '1h',
    });
    res.json({
        mensagem: 'Login realizado com sucesso',
        token,
    });
});
exports.default = router;
