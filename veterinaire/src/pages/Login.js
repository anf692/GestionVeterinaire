import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(credentials.username, credentials.password);

      if (result.success) {
        navigate('/');
        showAlert('Connexion réussie!');
      } else {
        showAlert(result.error || 'Échec de la connexion', 'error');
      }
    } catch (error) {
      showAlert('Erreur inattendue lors de la connexion', 'error');
      console.error('Erreur lors du login:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="cardhome">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
