import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Banco conectado');
  } catch (error) {
    console.error('Erro ao conectar no banco', error);
  }
};
