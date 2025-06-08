import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient, createPatient, updatePatient } from '../services/patientService';
import PatientForm from '../components/patients/PatientForm';
import { useAlert } from '../contexts/AlertContext';

const PatientFormPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isEdit) {
      getPatient(id)
        .then((res) => setInitialData(res.data))
        .catch(() => showAlert("Erreur de chargement du patient", "error"));
    }
  }, [id, isEdit, showAlert]);

  const handleSubmit = async (data) => {
    try {
      if (isEdit) {
        await updatePatient(id, data);
        showAlert("Patient mis à jour avec succès", "success");
      } else {
        await createPatient(data);
        showAlert("Patient créé avec succès", "success");
      }
      navigate("/patients");
    } catch (error) {
      showAlert("Erreur lors de l’enregistrement", "error");
    }
  };

  if (!isEdit || initialData) {
    return <PatientForm onSubmit={handleSubmit} initialData={initialData} />;
  }

  return <p>Chargement...</p>;
};

export default PatientFormPage;
