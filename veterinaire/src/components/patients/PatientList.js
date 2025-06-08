  // src/components/patients/PatientList.js
  import React, { useEffect, useState } from 'react';
  import { useNavigate, Link } from 'react-router-dom';
  import { getPatients, deletePatient } from '../../services/patientService';
  import { useAlert } from '../../contexts/AlertContext';
  import { capitalize } from '../../utils/formatters';

  const PatientList = ({ ownerFilter = null, refresh }) => {
    const [patients, setPatients] = useState([]);
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const fetchPatients = async () => {
      try {
        const res = await getPatients(ownerFilter);
        setPatients(res.data);
      } catch {
        showAlert('Erreur de chargement', 'error');
      }
    };

    useEffect(() => {
      fetchPatients();
    }, [ownerFilter, refresh]);

    const handleDelete = async (id) => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
        try {
          await deletePatient(id);
          showAlert("Patient supprimé avec succès", "success");
          fetchPatients();
        } catch {
          showAlert("Erreur lors de la suppression", "error");
        }
      }
    };

    return (
      <div className="card">
        <h2>Liste des Patients</h2>
        {patients.length === 0 ? (
          <p>Aucun patient trouvé</p>
        ) : (
          <div className="list-container">
            {patients.map((patient) => (
              <div key={patient.id} className="list-item">
                <div>
                  <h3>{patient.name}</h3>
                  <p>{capitalize(patient.animal_type)} - {patient.breed}</p>
                </div>
                <Link to={`/patients/${patient.id}/edit`} className="button">Modifier</Link>
                <button className="button" onClick={() => handleDelete(patient.id)}>Supprimer</button>
                <Link to={`/patients/${patient.id}`} className="button">
                  Voir détails
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default PatientList;
