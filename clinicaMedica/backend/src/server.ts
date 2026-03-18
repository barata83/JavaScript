import express from 'express';
import authRoutes from './routes/auth';
import consultasRoutes from './routes/consultas';
import cepRoutes from './routes/cep';
import climaRoutes from './routes/clima';
import { connectDatabase } from './database/connection';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Clínica Médica funcionando 🚀');
});

app.use('/cep', cepRoutes);
app.use('/auth', authRoutes);
app.use('/consultas', consultasRoutes);
app.use('/clima', climaRoutes);

connectDatabase().catch(console.error);

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
