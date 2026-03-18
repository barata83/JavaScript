import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://marvelous-emotion-production-75bc.up.railway.app/',
});
