import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OwnerForm from '../components/owners/OwnerForm';
import { getOwner, createOwner, updateOwner } from '../services/ownerService';
import { useAlert } from '../contexts/AlertContext';

const OwnerFormPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isEdit) {
      getOwner(id)
        .then(res => setInitialData(res.data))
        .catch(() => showAlert("Erreur de chargement du propriétaire", "error"));
    }
  }, [id, isEdit, showAlert]);

  const handleSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateOwner(id, data);
        showAlert("Propriétaire mis à jour avec succès", "success");
      } else {
        await createOwner(data);
        showAlert("Propriétaire créé avec succès", "success");
      }
      navigate("/owners");
    } catch (error) {
      showAlert("Erreur lors de l’enregistrement", "error");
    }
  };

  if (!isEdit || initialData) {
    return <OwnerForm onSubmit={handleSubmit} initialData={initialData} />;
  }

  return <p>Chargement...</p>;
};

export default OwnerFormPage;
