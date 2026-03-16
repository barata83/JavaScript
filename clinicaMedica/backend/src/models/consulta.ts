import mongoose from 'mongoose';

const consultaSchema = new mongoose.Schema({
  paciente: String,
  medico: String,
  data: String,
  hora: String,
  cep: String,
  rua: String,
  cidade: String,
  estado: String,
});

export const Consulta = mongoose.model('Consulta', consultaSchema);
