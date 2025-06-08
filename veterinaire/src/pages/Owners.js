// src/pages/Owners.js
import React from 'react';
import { Link } from 'react-router-dom';
import OwnerList from '../components/owners/OwnerList';

const Owners = () => {
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4 owner owner">
        <h1>Gestion des Propriétaires</h1>
        <Link to="/owners/new" className="button green">
          + Ajouter un propriétaire
        </Link>
      </div>
      <OwnerList />
    </div>
  );
};

export default Owners;
