<template>
  <div>
    <h1>Login</h1>

    <input v-model="email" placeholder="Email" />
    <input v-model="senha" type="password" placeholder="Senha" />

    <button @click="login">Entrar</button>

    <p>{{ mensagem }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const senha = ref('');
const mensagem = ref('');

async function login() {
  try {
    const resposta = await api.post('/auth/login', {
      email: email.value,
      senha: senha.value,
    });

    const token = resposta.data.token;

    localStorage.setItem('token', token);

    mensagem.value = 'Login realizado com sucesso';

    console.log(token);

    // redireciona para agendamento
    router.push('/agendamento');
  } catch (erro) {
    mensagem.value = 'Erro no login';
  }
}
</script>
