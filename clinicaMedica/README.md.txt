# Sistema de Agendamento de Consultas Médicas

Projeto desenvolvido como trabalho acadêmico com o objetivo de criar um sistema completo de agendamento de consultas médicas utilizando **Node.js no backend e Vue.js no frontend**.

O sistema permite que usuários façam login, agendem consultas, consultem agendamentos existentes e cancelem consultas.

---

# Funcionalidades

✔ Login de usuário com autenticação JWT  
✔ Cadastro de consultas médicas  
✔ Listagem de consultas agendadas  
✔ Cancelamento de consultas  
✔ Edição de consultas  
✔ Busca automática de endereço via CEP (ViaCEP)  
✔ Consulta de clima da cidade da consulta (OpenWeather API)

---

# Tecnologias utilizadas

## Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Axios

## Frontend
- Vue.js 3
- Vite
- JavaScript
- HTML
- CSS

## APIs externas
- ViaCEP → busca de endereço pelo CEP
- OpenWeather → consulta de clima da cidade

---

# Estrutura do Projeto

clinicaMedica
│
├── backend
│ ├── src
│ │ ├── routes
│ │ ├── models
│ │ ├── middlewares
│ │ └── server.ts
│
├── frontend
│ ├── src
│ │ ├── views
│ │ ├── services
│ │ └── router
│
└── README.md


---

# ⚙️ Como executar o projeto

## 1️⃣ Clonar o projeto

https://github.com/barata83/JavaScript


# 2️⃣ Instalar dependências

Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

# 3️⃣ Rodar o backend

cd backend
npx ts-node-dev src/server.ts

Servidor rodará em: http://localhost:3000/

# 4️⃣ Rodar o frontend

cd frontend
npm run dev
Servidor rodará em: http://localhost:5173/


---

# 🌐 APIs utilizadas

### ViaCEP
https://viacep.com.br/

Utilizada para buscar endereço automaticamente a partir do CEP.

---

### OpenWeather
https://openweathermap.org/

Utilizada para obter previsão do clima na cidade da consulta.

---

# 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para proteger rotas e garantir que apenas usuários autenticados possam acessar o sistema.

O token é armazenado no **localStorage do navegador**.

---

# 👨‍💻 Autor

Projeto desenvolvido por **Leandro**  
Curso: **Análise e Desenvolvimento de Sistemas**


