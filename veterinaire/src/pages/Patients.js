import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/patients/PatientList';
import { useAuth } from '../hooks/useAuth';

const Patients = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddPatientClick = () => {
    if (user?.role === 'VET') {
      alert("Vous n'avez pas les droits pour ajouter un patient.");
    } else {
      navigate('/patients/new');
    }
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4 patient">
        <h1>Gestion des Patients</h1>
        <button onClick={handleAddPatientClick} className="button green">
          + Ajouter un patient
        </button>
      </div>
      <PatientList refresh={refresh} />
    </div>
  );
};

export default Patients;
