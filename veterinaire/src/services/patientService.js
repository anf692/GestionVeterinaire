
import axios from "axios";
import api from './api';


export const getPatientById = async (id) => {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await axios.post(API_URL, patientData);
  return response.data;
};

export const updatePatient = async (id, patientData) => {
  const response = await axios.put(`${API_URL}${id}/`, patientData);
  return response.data;
};

export const deletePatient = async (id) => {
  await axios.delete(`${API_URL}${id}/`);
};
