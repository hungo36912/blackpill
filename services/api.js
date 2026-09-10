import axios from 'axios';

const API_URL = ' https://cardinal-dipper-wad.ngrok-free.dev'; 

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'json/application' ? 'application/json' : 'application/json',
  },
});

export default api;