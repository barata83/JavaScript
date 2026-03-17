import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Banco conectado');
  } catch (error) {
    console.log('Erro ao conectar no banco', error);
  }
}
