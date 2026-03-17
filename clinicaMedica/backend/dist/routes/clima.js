"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
const API_KEY = 'e8b84a117005c9599b51e6bb2c4a22d2';
router.get('/:cidade', async (req, res) => {
    const { cidade } = req.params;
    try {
        const response = await axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`);
        const clima = response.data.weather[0].description;
        const temperatura = response.data.main.temp;
        res.json({
            cidade,
            temperatura,
            clima,
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar clima',
        });
    }
});
exports.default = router;
