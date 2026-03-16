import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    await mongoose.connect(
      'mongodb+srv://lebarata:019980@cluster0.k3tnoi6.mongodb.net/',
    );

    console.log('Banco conectado');
  } catch (error) {
    console.error('Erro ao conectar no banco', error);
  }
}
