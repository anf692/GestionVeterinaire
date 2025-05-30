import React, { useEffect, useState } from "react";
import { getPatients } from "../../services/patientService";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Erreur de récupération des patients :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Liste des Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.nom} - {patient.type_animal} ({patient.proprietaire.nom})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
