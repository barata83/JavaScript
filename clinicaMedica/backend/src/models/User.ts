import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: String,

  email: String,

  senha: String,
});

export const User = mongoose.model('User', userSchema);
