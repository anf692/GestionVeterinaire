import { useAuth } from '../hooks/useAuth';
import { FaPaw, FaDog, FaLock } from 'react-icons/fa';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <h1>Bienvenue à la Clinique Sunu Vétérinaire</h1>
      {user ? (
        <div className="dashboard-cards">
          <div className="cardhome">
            <h2>
              <FaPaw style={{ color: '#43a047', marginRight: '8px' }} />
              Gestion des Propriétaires
            </h2>
            <p>Accédez à la liste complète des propriétaires et de leurs animaux</p>
          </div>
          <div className="cardhome">
            <h2>
              <FaDog style={{ color: '#43a047', marginRight: '8px' }} />
              Gestion des Patients
            </h2>
            <p>Consultez et gérez les dossiers médicaux des animaux</p>
          </div>
        </div>
      ) : (
        <div className="cardhome" style={{ textAlign: 'center' }}>
          <h2>
            <FaLock style={{ color: '#43a047', marginRight: '8px' }} />
            Veuillez vous connecter
          </h2>
          <p>Accédez à votre espace professionnel en vous authentifiant</p>
        </div>
      )}
    </div>
  );
};

export default Home;
