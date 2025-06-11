import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getOwners, deleteOwner } from '../../services/ownerService';
import { useAlert } from '../../contexts/AlertContext';

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const fetchOwners = async () => {
    try {
      const res = await getOwners();
      setOwners(res.data);
    } catch {
      showAlert('Erreur de chargement', 'error');
    }
  };


  useEffect(() => {
    fetchOwners();
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce propriétaire ?")) {
      try {
        await deleteOwner(id);
        showAlert("Propriétaire supprimé avec succès", "success");
        fetchOwners();
      } catch {
        showAlert("Erreur lors de la suppression", "error");
      }

    }
  };

  return (

    <div className="card">
      <h2>Liste des Propriétaires</h2>
      {owners.length === 0 ? (
        <p>Aucun propriétaire trouvé</p>
      ) : (
        <div className="list-container">
          {owners.map((owner) => (
            <div key={owner.id} className="list-item">
              <div>
                <h3>{owner.first_name} {owner.last_name}</h3>
              </div>
              <Link to={`/owners/${owner.id}/edit`} className="button">Modifier</Link>
              <button className="button" onClick={() => handleDelete(owner.id)}>Supprimer</button>
              <Link to={`/owners/${owner.id}`} className="button">
                Voir détails
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default OwnerList;
