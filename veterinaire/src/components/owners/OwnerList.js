// src/components/owners/OwnerList.js
import React, { useEffect, useState } from 'react';
import { getOwners, deleteOwner } from '../../services/ownerService';
import { Link } from 'react-router-dom';

const OwnerList = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    const res = await getOwners();
    setOwners(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce propriétaire ?")) {
      await deleteOwner(id);
      fetchOwners();
    }
  };

  return (
    <div>
      <h2>Propriétaires</h2>
      <Link to="/owners/new">Ajouter un propriétaire</Link>
      <ul>
        {owners.map(owner => (
          <li key={owner.id}>
            <Link to={`/owners/${owner.id}`}>{owner.nom} {owner.prenom}</Link>
            <button onClick={() => handleDelete(owner.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerList;
