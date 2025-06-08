import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter les tokens à chaque requête automatiquement 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Token ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Gérer les erreurs globales 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API :', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
