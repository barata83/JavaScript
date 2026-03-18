import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    // Adicionado para depuração:
    console.log('Tentando conectar... URI:', process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error('A variável de ambiente MONGO_URI não foi definida!');
    }

    console.log('MONGO_URI ->', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Banco conectado');
  } catch (error) {
    console.log('Erro ao conectar no banco', error);
  }
}
