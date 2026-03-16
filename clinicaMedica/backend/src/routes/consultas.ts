import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { Consulta } from '../models/consulta';

const router = Router();
router.post('/', authMiddleware, async (req, res) => {
  const { paciente, medico, data, hora, cep, rua, cidade, estado } = req.body;

  const consultaExistente = await Consulta.findOne({
    medico,
    data,
    hora,
  });

  if (consultaExistente) {
    return res.status(400).json({
      mensagem: 'Horário já está ocupado',
    });
  }

  const novaConsulta = await Consulta.create({
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
  const consultas = await Consulta.find();

  res.json({
    consultas,
  });
});

router.get('/:id', async (req, res) => {
  const consulta = await Consulta.findById(req.params.id);

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
  const consulta = await Consulta.findByIdAndDelete(req.params.id);

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

  const consulta = await Consulta.findByIdAndUpdate(
    req.params.id,
    {
      paciente,
      medico,
      data,
      hora,
      cep,
      rua,
      cidade,
      estado,
    },
    { new: true },
  );

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

export default router;
