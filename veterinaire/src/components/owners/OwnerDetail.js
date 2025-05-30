// src/components/owners/OwnerDetail.js
import React, { useEffect, useState } from 'react';
import { getOwner } from '../../services/ownerService';
import { useParams, Link } from 'react-router-dom';

const OwnerDetail = () => {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    getOwner(id).then(res => setOwner(res.data));
  }, [id]);

  if (!owner) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Détails du Propriétaire</h2>
      <p><strong>Nom :</strong> {owner.nom}</p>
      <p><strong>Prénom :</strong> {owner.prenom}</p>
      <p><strong>Adresse :</strong> {owner.adresse}</p>
      <p><strong>Téléphone :</strong> {owner.telephone}</p>
      <p><strong>Email :</strong> {owner.email}</p>
      <Link to={`/owners/edit/${owner.id}`}>Modifier</Link>
    </div>
  );
};

export default OwnerDetail;
 