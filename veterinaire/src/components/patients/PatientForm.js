import React, { useState } from "react";
import { createPatient, updatePatient } from "../../services/patientService";

const PatientForm = ({ patient }) => {
  const [formData, setFormData] = useState(
    patient || { nom: "", type_animal: "", race: "", date_naissance: "", proprietaire_id: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (patient) {
        await updatePatient(patient.id, formData);
      } else {
        await createPatient(formData);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du patient :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
      <input type="text" name="type_animal" value={formData.type_animal} onChange={handleChange} placeholder="Type d'animal" required />
      <input type="text" name="race" value={formData.race} onChange={handleChange} placeholder="Race" />
      <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
      <input type="text" name="proprietaire_id" value={formData.proprietaire_id} onChange={handleChange} placeholder="ID du propriétaire" required />
      <button type="submit">{patient ? "Modifier" : "Ajouter"} le patient</button>
    </form>
  );
};

export default PatientForm;
