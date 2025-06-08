import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: '',
    animal_type: '',
    breed: '',
    birth_date: '',
    weight: '',
    sex: '',
    owner: '',
  });
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  useEffect(() => {
    // Récupère la liste des propriétaires depuis le backend
    axios.get('http://localhost:8000/api/owners/')
      .then((res) => setOwners(res.data))
      .catch((err) => console.error('Erreur récupération owners:', err));

    // Si on est en mode édition, récupère les données du patient
    if (isEditMode) {
      axios.get(`http://localhost:8000/api/patients/${id}/`)
        .then((res) => setPatient(res.data))
        .catch((err) => console.error('Erreur récupération patient:', err));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = isEditMode ? axios.put : axios.post;
    const url = isEditMode
      ? `http://localhost:8000/api/patients/${id}/`
      : 'http://localhost:8000/api/patients/';

    method(url, patient)
      .then(() => navigate('/patients'))
      .catch((err) => console.error('Erreur sauvegarde patient:', err));
  };

  return (
    <div className="detail-container">
      <h2 className="detail-title">
        {isEditMode ? 'Modifier le patient' : 'Ajouter un patient'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type d'animal</label>
          <select
            name="animal_type"
            value={patient.animal_type}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir --</option>
            <option value="CAT">Chat</option>
            <option value="DOG">Chien</option>
            <option value="RABBIT">Lapin</option>
          </select>
        </div>

        <div className="form-group">
          <label>Race</label>
          <input
            type="text"
            name="breed"
            value={patient.breed}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date de naissance</label>
          <input
            type="date"
            name="birth_date"
            value={patient.birth_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Poids (kg)</label>
          <input
            type="number"
            name="weight"
            value={patient.weight}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Sexe</label>
          <select
            name="sex"
            value={patient.sex}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir --</option>
            <option value="MALE">Mâle</option>
            <option value="FEMALE">Femelle</option>
          </select>
        </div>

        <div className="form-group">
          <label>Propriétaire</label>
          <select
            name="owner"
            value={patient.owner}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir --</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.first_name} {owner.last_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="button">
          {isEditMode ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};  

export default PatientForm;
