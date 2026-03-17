"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const consulta_1 = require("../models/consulta");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authMiddleware, async (req, res) => {
    const { paciente, medico, data, hora, cep, rua, cidade, estado } = req.body;
    const consultaExistente = await consulta_1.Consulta.findOne({
        medico,
        data,
        hora,
    });
    if (consultaExistente) {
        return res.status(400).json({
            mensagem: 'Horário já está ocupado',
        });
    }
    const novaConsulta = await consulta_1.Consulta.create({
        paciente,
        medico,
        data,
        hora,
        cep,
        rua,
        cidade,
        estado,
    });
    res.json({
        mensagem: 'Consulta agendada com sucesso',
        consulta: novaConsulta,
    });
});
router.get('/', async (req, res) => {
    const consultas = await consulta_1.Consulta.find();
    res.json({
        consultas,
    });
});
router.get('/:id', async (req, res) => {
    const consulta = await consulta_1.Consulta.findById(req.params.id);
    if (!consulta) {
        return res.status(404).json({
            mensagem: 'Consulta não encontrada',
        });
    }
    res.json({
        consulta,
    });
});
router.delete('/:id', async (req, res) => {
    const consulta = await consulta_1.Consulta.findByIdAndDelete(req.params.id);
    if (!consulta) {
        return res.status(404).json({
            mensagem: 'Consulta não encontrada',
        });
    }
    res.json({
        mensagem: 'Consulta cancelada com sucesso',
    });
});
router.put('/:id', async (req, res) => {
    const { paciente, medico, data, hora, cep, rua, cidade, estado } = req.body;
    const consulta = await consulta_1.Consulta.findByIdAndUpdate(req.params.id, {
        paciente,
        medico,
        data,
        hora,
        cep,
        rua,
        cidade,
        estado,
    }, { new: true });
    if (!consulta) {
        return res.status(404).json({
            mensagem: 'Consulta não encontrada',
        });
    }
    res.json({
        mensagem: 'Consulta atualizada com sucesso',
        consulta,
    });
});
exports.default = router;
