import axios from 'axios';

const API_URL = 'https://making-pursuant-candle.ngrok-free.dev/api'; 

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'json/application' ? 'application/json' : 'application/json',
  },
});

export default api;