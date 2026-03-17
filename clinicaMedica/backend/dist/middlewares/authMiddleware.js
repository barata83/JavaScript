"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log('HEADER:', authHeader);
    if (!authHeader) {
        return res.status(401).json({
            mensagem: 'Token não fornecido',
        });
    }
    const token = authHeader.split(' ')[1];
    console.log('TOKEN RECEBIDO:', token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'segredo-super');
        console.log('TOKEN VÁLIDO:', decoded);
        next();
    }
    catch (erro) {
        console.log('ERRO JWT:', erro);
        return res.status(401).json({
            mensagem: 'Token inválido',
        });
    }
}
