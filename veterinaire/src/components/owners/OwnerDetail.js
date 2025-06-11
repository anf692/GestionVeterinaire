
import React from 'react';
import '../../index.css';

export default function OwnerDetail({ owner }) {
  if (!owner) {
    return (
      <div className="owner-detail-empty">
        Aucun propriétaire sélectionné
      </div>
    );
  }


  return (
    <div className="owner-detail-container">
      <h3 className="owner-detail-title">👤 Détails du Propriétaire</h3>
      <div className="owner-detail-info">
        <p><strong>Nom :</strong> {owner.first_name} {owner.last_name}</p>
        <p><strong>Adresse :</strong> {owner.address}</p>
        <p><strong>Téléphone :</strong> {owner.phone}</p>
        <p><strong>Email :</strong> {owner.email}</p>
      </div>
    </div>
  );
}

