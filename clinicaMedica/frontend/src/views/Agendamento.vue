<template>
  <div class="container">
    <h1>🏥 Clínica Médica</h1>
    <h2>Agendamento de Consulta</h2>

    <div class="form-card">
      <input v-model="paciente" placeholder="Paciente" />
      <input v-model="medico" placeholder="Médico" />
      <input type="date" v-model="data" />
      <input type="time" v-model="hora" />
      <input v-model="cep" placeholder="CEP" @blur="buscarCep" />
      <input v-model="rua" placeholder="Rua" />
      <input v-model="cidade" placeholder="Cidade" />
      <input v-model="estado" placeholder="Estado" />

      <button @click="agendar">
        {{ idConsulta ? 'Atualizar Consulta' : 'Agendar Consulta' }}
      </button>

      <p class="mensagem">{{ mensagem }}</p>
    </div>

    <h2>Consultas cadastradas</h2>

    <table>
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Médico</th>
          <th>Data</th>
          <th>Hora</th>
          <th>CEP</th>
          <th>Rua</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="consulta in consultas" :key="consulta._id">
          <td>{{ consulta.paciente }}</td>
          <td>{{ consulta.medico }}</td>
          <td>{{ consulta.data }}</td>
          <td>{{ consulta.hora }}</td>
          <td>{{ consulta.cep }}</td>
          <td>{{ consulta.rua }}</td>
          <td>{{ consulta.cidade }}</td>
          <td>{{ consulta.estado }}</td>

          <td>
            <button class="editar" @click="editar(consulta)">Editar</button>
            <button class="cancelar" @click="cancelar(consulta._id)">
              Cancelar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="clima" class="clima">🌤 Clima na cidade: {{ clima }}</p>

    <button class="logout" @click="logout">Sair</button>

    <router-link to="/dashboard" class="voltar">
      ⬅ Voltar para Dashboard
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../services/api';

const paciente = ref('');
const medico = ref('');
const data = ref('');
const hora = ref('');
const mensagem = ref('');
const consultas = ref([]);
const idConsulta = ref(null);

const cep = ref('');
const rua = ref('');
const cidade = ref('');
const estado = ref('');
const clima = ref('');

async function carregarConsultas() {
  const token = localStorage.getItem('token');

  try {
    const resposta = await api.get('/consultas', {
      headers: { Authorization: `Bearer ${token}` },
    });

    consultas.value = resposta.data.consultas;
  } catch {
    console.log('Erro ao carregar consultas');
  }
}

async function agendar() {
  const token = localStorage.getItem('token');

  await buscarClima();

  try {
    if (idConsulta.value) {
      await api.put(
        `/consultas/${idConsulta.value}`,
        {
          paciente: paciente.value,
          medico: medico.value,
          data: data.value,
          hora: hora.value,
          cep: cep.value,
          rua: rua.value,
          cidade: cidade.value,
          estado: estado.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      mensagem.value = 'Consulta atualizada';

      idConsulta.value = null;
    } else {
      await api.post(
        '/consultas',
        {
          paciente: paciente.value,
          medico: medico.value,
          data: data.value,
          hora: hora.value,
          cep: cep.value,
          rua: rua.value,
          cidade: cidade.value,
          estado: estado.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      mensagem.value = 'Consulta criada';
    }

    limparCampos();
    carregarConsultas();
  } catch {
    mensagem.value = 'Erro ao salvar consulta';
  }
}

function limparCampos() {
  paciente.value = '';
  medico.value = '';
  data.value = '';
  hora.value = '';
  cep.value = '';
  rua.value = '';
  cidade.value = '';
  estado.value = '';
}

async function cancelar(id) {
  const token = localStorage.getItem('token');

  try {
    await api.delete(`/consultas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    carregarConsultas();
  } catch {
    console.log('Erro ao cancelar');
  }
}

function editar(consulta) {
  paciente.value = consulta.paciente;
  medico.value = consulta.medico;
  data.value = consulta.data;
  hora.value = consulta.hora;
  cep.value = consulta.cep;
  rua.value = consulta.rua;
  cidade.value = consulta.cidade;
  estado.value = consulta.estado;

  idConsulta.value = consulta._id;
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}

async function buscarCep() {
  if (!cep.value) return;

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
    const dados = await resposta.json();

    rua.value = dados.logradouro;
    cidade.value = dados.localidade;
    estado.value = dados.uf;
  } catch {
    console.log('Erro ao buscar CEP');
  }
}

async function buscarClima() {
  if (!cidade.value) return;

  try {
    const resposta = await api.get(`/clima/${cidade.value}`);

    clima.value = resposta.data.temperatura + '°C - ' + resposta.data.clima;
  } catch {
    console.log('Erro ao buscar clima');
  }
}

onMounted(() => {
  carregarConsultas();
});
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f6f9;
}

.container {
  max-width: 900px;
  margin: 80px auto;
  padding: 30px;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

h2 {
  text-align: center;
  color: #555;
}

.form-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  background: #3498db;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background: #2980b9;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  margin-top: 20px;
}

th {
  background: #3498db;
  color: white;
  padding: 10px;
}

td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

tr:hover {
  background: #f2f2f2;
}

.editar {
  background: #f39c12;
}

.cancelar {
  background: #e74c3c;
}

.logout {
  margin-top: 20px;
  background: #2c3e50;
}

.mensagem {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}

.clima {
  margin-top: 20px;
  font-weight: bold;
}

.voltar {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  background: #2c3e50;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
}

.voltar:hover {
  background: #1a252f;
}
</style>
