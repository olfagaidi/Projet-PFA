import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');  // Renommé username en email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8087/api/v1/auth/login', {
        email,  // Utilisation de email au lieu de username
        password,
      });
      console.log('Connexion réussie:', response.data);

      if (email.includes('admin')) {
        navigate('/dashboard');
      } else {
        navigate('/accueil');
      }
      
    } catch (err) {
      setError('Identifiants invalides. Veuillez réessayer.');
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>CONNECTEZ-VOUS MAINTENANT</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"  // Le type "email" est utilisé pour l'adresse e-mail
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <button type="submit" className="submit-button">
          &#128274; Connexion
        </button>
      </form>
    </div>
  );
}

export default Login;
