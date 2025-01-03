// App.js
import React,  { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/Login/Login';
import Home from './components/Home/Home';
import Accueil from './components/Accueil/Accueil';
import Acueil from './components/Accueil/acueil';
import Navbar from './components/Navbar/navbar';
import Profile from './components/Profil/profile';
import Publication from './components/Publication/publication' ;
import Sante from './components/Events/sante' ;
import Social from './components/Events/sociale' ;
import Animaux from './components/Events/animaux' ;
import Footer from './components/footer';
import EditProfile from './components/EditProfile';
import Event from './components/event';

import './App.css';

function App() {
  const [userData, setUserData] = useState({
    name: 'Laila Aouadi',
    email: 'Laila@gmail.com',
    phone: '(216) 51819776',
    address: 'Ariana, Tunisie',
    poste: 'Santé',
    date:'12/11/1999'
  });

  // Fonction pour mettre à jour les données de profil
  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
        
          <h1 className="logo">نبض <span>التطوع</span></h1>
          <Link to="/" className="nav-button home-button">Accueil</Link>
          <div className="nav-buttons">
            <Link to="/signup" className="nav-button">S'inscrire</Link>
            <Link to="/login" className="nav-button">Se connecter</Link>
          </div>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accueil" element={<Accueil />} />
            
          </Routes>
        </div>
        <Routes>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile userData={userData} updateUserData={updateUserData} />} />
            <Route 
          path="/edit-profile" 
          element={<EditProfile userData={userData} updateUserData={updateUserData} />} 
        />
            <Route path="/accueil" element={<Acueil />} />
            <Route path="/event" element={<Event />} />
            <Route path="/sante" element={<Sante />} />
            <Route path="/sociale" element={<Social />} />
            <Route path="/animaux" element={<Animaux />} />
            <Route path="/publication" element={<Publication />} />

          </Routes>
        </div>
        <Footer />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
