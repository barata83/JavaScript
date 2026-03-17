"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consulta = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const consultaSchema = new mongoose_1.default.Schema({
    paciente: String,
    medico: String,
    data: String,
    hora: String,
    cep: String,
    rua: String,
    cidade: String,
    estado: String,
});
exports.Consulta = mongoose_1.default.model('Consulta', consultaSchema);
