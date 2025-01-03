// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/Login/Login';
import Home from './components/Home/Home';
import Accueil from './components/Accueil/Accueil';
import Acueil from './components/Accueil/acueil';
import Navbar from './components/Navbar/navbar'; // Navbar après connexion
import NavbarHome from './components/Navbar/NavbarHome'; // Navbar pour la page d'accueil
import Profile from './components/Profil/profile';
import Publication from './components/Publication/publication';
import Sante from './components/Events/sante';
import Social from './components/Events/sociale';
import Animaux from './components/Events/animaux';
import Footer from './components/Footer/footer';
import EditProfile from './components/Profil/editprofile';

import './App.css';

function App() {
  const [userData, setUserData] = useState({
    name: 'Laila Aouadi',
    email: 'Laila@gmail.com',
    phone: '(216) 51819776',
    address: 'Ariana, Tunisie',
    poste: 'Santé',
    date: '12/11/1999'
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Etat de connexion

  // Fonction pour mettre à jour les données de profil
  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <Router>
      <div>
        {/* Conditionner l'affichage de Navbar en fonction de la connexion */}
        {isLoggedIn ? <Navbar /> : <NavbarHome />} {/* Afficher NavbarHome si non connecté */}
        
        <div className="main-content">
          {/* Routes devraient contenir uniquement des composants Route */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/acueil" element={<Acueil />} />

            <Route path="/profile" element={<Profile userData={userData} updateUserData={updateUserData} />} />
            <Route path="/edit-profile" element={<EditProfile userData={userData} updateUserData={updateUserData} />} />
            <Route path="/sante" element={<Sante />} />
            <Route path="/sociale" element={<Social />} />
            <Route path="/animaux" element={<Animaux />} />
            <Route path="/publication" element={<Publication />} />
          </Routes>
        </div>

        {/* Footer affiché sur toutes les pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
