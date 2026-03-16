import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/:cep', async (req, res) => {
  const { cep } = req.params;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao buscar CEP',
    });
  }
});

export default router;
