"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.get('/:cep', async (req, res) => {
    const { cep } = req.params;
    try {
        const response = await axios_1.default.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar CEP',
        });
    }
});
exports.default = router;
