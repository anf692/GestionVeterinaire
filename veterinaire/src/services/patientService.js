import api from './api';

export const getPatients = (ownerId = null) => {
  const url = ownerId ? `/patients/?owner=${ownerId}` : '/patients/';
  return api.get(url);
};

export const getPatient = (id) => api.get(`/patients/${id}/`);
export const createPatient = (data) => api.post('/patients/', data);
export const updatePatient = (id, data) => api.put(`/patients/${id}/`, data);
export const deletePatient = (id) => api.delete(`/patients/${id}/`);
export const getPatientsByType = (type) => api.get(`/patients/?animal_type=${type}`);
