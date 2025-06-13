import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../services/patientService';
import PatientDetail from '../components/patients/PatientDetail';

const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await getPatient(id);
        setPatient(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement du patient', error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Chargement...</p>;

  return (
    <div className="page-container">
      <PatientDetail patient={patient} />
    </div>
  );
};

export default PatientDetailPage;
