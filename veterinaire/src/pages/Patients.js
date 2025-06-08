import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientList from '../components/patients/PatientList';

const Patients = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4 patient">
        <h1>Gestion des Patients</h1>
        <Link to="/patients/new" className="button green">
          + Ajouter un patient
        </Link>
      </div>
      <PatientList refresh={refresh} />
    </div>
  );
};

export default Patients;
