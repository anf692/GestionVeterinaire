
import React from 'react';
import '../../index.css';

export default function PatientDetail({ patient }) {
  if (!patient) {
    return (
      <div className="patient-detail-empty">
        Aucun patient sélectionné
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <h3 className="patient-detail-title">🐾 Détails de l'animal</h3>
      <div className="patient-detail-info">
        <p><strong>Nom :</strong> {patient.name}</p>
        <p><strong>Type :</strong> {patient.animal_type}</p>
        <p><strong>Race :</strong> {patient.breed}</p>
        <p><strong>Date de naissance :</strong> {patient.birth_date}</p>
        <p><strong>Poids :</strong> {patient.weight} kg</p>
        <p><strong>Sexe :</strong> {patient.sex}</p>
      </div>
    </div>
  );
}
