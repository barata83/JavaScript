import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = Router();

const usuarios: any[] = [];

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuario = await User.create({
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

  const usuario = await User.findOne({
    email,
    senha,
  });

  if (!usuario) {
    return res.status(401).json({
      mensagem: 'Email ou senha inválidos',
    });
  }

  const token = jwt.sign({ email: usuario.email }, 'segredo-super', {
    expiresIn: '1h',
  });

  res.json({
    mensagem: 'Login realizado com sucesso',
    token,
  });
});

export default router;
