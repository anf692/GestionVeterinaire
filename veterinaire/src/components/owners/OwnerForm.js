// src/components/owners/OwnerForm.js
import React, { useState, useEffect } from 'react';


const OwnerForm = ({ onSubmit, initialData }) => {
  const [owner, setOwner] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (initialData) {
      setOwner(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(owner);
  };

  return (
    <div className="detail-container">
      <h2>{initialData ? 'Modifier le propriétaire' : 'Ajouter un propriétaire'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="first_name"
            value={owner.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="last_name"
            value={owner.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={owner.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={owner.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Adresse</label>
          <input
            type="text"
            name="address"
            value={owner.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="button">
          {initialData ? 'Mettre à jour' : 'Ajouter'}
        </button>

      </form>
    </div>
  );
};

export default OwnerForm;
