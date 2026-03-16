<template>
  <div class="container text-center mt-5">
    <h1 class="text-primary">Sistema da Clínica</h1>

    <p class="lead">Gerenciamento de consultas médicas</p>

    <div class="card p-4 shadow mt-4">
      <h3>Área de consultas</h3>
      <p>Total de consultas: {{ totalConsultas }}</p>

      <router-link class="btn btn-primary mt-3" to="/agendamento">
        Ir para consultas
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../services/api';

const totalConsultas = ref(0);

async function carregar() {
  const token = localStorage.getItem('token');

  const resposta = await api.get('/consultas', {
    headers: { Authorization: `Bearer ${token}` },
  });

  totalConsultas.value = resposta.data.consultas.length;
}

onMounted(() => {
  carregar();
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  font-family: Arial;
}

.titulo {
  color: white;
  font-size: 40px;
  margin-bottom: 10px;
}

.subtitulo {
  color: white;
  margin-bottom: 30px;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.botao {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 25px;
  background: #4facfe;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.botao:hover {
  background: #2f80ed;
}
</style>
