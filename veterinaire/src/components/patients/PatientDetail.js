import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientById } from "../../services/patientService";

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatientById(id);
        setPatient(data);
      } catch (error) {
        console.error("Erreur de récupération du patient :", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Détails du Patient</h2>
      <p><strong>Nom :</strong> {patient.nom}</p>
      <p><strong>Type :</strong> {patient.type_animal}</p>
      <p><strong>Race :</strong> {patient.race}</p>
      <p><strong>Date de Naissance :</strong> {patient.date_naissance}</p>
      <p><strong>Propriétaire :</strong> {patient.proprietaire.nom}</p>
    </div>
  );
};

export default PatientDetail;
