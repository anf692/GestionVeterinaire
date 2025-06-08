import api from './api';

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('auth/login/', {
      username,
      password
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.non_field_errors?.[0] || 'Erreur de connexion';
    console.error('Erreur de connexion:', error.response?.data || error.message);
    throw new Error(errorMsg);
  }
};

export const logoutUser = async () => {
  await api.post('auth/logout/');
};
