// src/axios.js

import axios from 'axios';
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Configuración global de Axios
const instance = axios.create({
  baseURL: 'http://localhost:3001', // Cambia esto con tu dirección base
  // Puedes agregar otras configuraciones aquí según tus necesidades
});

export default instance;