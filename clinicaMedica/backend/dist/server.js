"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const consultas_1 = __importDefault(require("./routes/consultas"));
const cep_1 = __importDefault(require("./routes/cep"));
const clima_1 = __importDefault(require("./routes/clima"));
const connection_1 = require("./database/connection");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rotas
app.use('/cep', cep_1.default);
app.use('/auth', auth_1.default);
app.use('/consultas', consultas_1.default);
app.use('/clima', clima_1.default);
// Rota inicial
app.get('/', (req, res) => {
    res.send('API Clínica Médica funcionando 🚀');
});
const PORT = process.env.PORT || 3000;
// Conectar banco e só depois subir servidor
(0, connection_1.connectDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
    .catch(error => {
    console.error('Erro ao conectar no banco:', error);
});
