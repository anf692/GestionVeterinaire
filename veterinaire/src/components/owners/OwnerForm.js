// src/components/owners/OwnerForm.js
import React, { useState, useEffect } from 'react';
import { createOwner, updateOwner, getOwner } from '../../services/ownerService';
import { useNavigate, useParams } from 'react-router-dom';

const OwnerForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    email: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getOwner(id).then(res => setFormData(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateOwner(id, formData);
    } else {
      await createOwner(formData);
    }
    navigate('/owners');
  };

  return (
    <div>
      <h2>{id ? "Modifier" : "Ajouter"} un propriétaire</h2>
      <form onSubmit={handleSubmit}>
        {["nom", "prenom", "adresse", "telephone", "email"].map(field => (
          <div key={field}>
            <label>{field}</label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default OwnerForm;
