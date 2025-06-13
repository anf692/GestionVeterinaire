import React from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerList from '../components/owners/OwnerList';
import { useAuth } from '../hooks/useAuth';

const Owners = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddOwnerClick = () => {
    if (user?.role === 'VET') {
      alert("Vous n'avez pas les droits pour ajouter un propriétaire.");
    } else {
      navigate('/owners/new');
    }
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4 owner owner">
        <h1>Gestion des Propriétaires</h1>
        <button onClick={handleAddOwnerClick} className="button green">
          + Ajouter un propriétaire
        </button>
      </div>
      <OwnerList />
    </div>
  );
};

export default Owners;
