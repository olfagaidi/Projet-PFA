import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/Login/Login';
import Home from './components/Home/Home';
import Accueil from './components/Accueil/Accueil';
import Acueil from './components/Accueil/acueil';
import Navbar from './components/Navbar/navbar';
import Profile from './components/Profil/profile';
import EditProfile from './components/Profil/editprofile';
import Publication from './components/Publication/publication';
import Sante from './components/Events/sante';
import Sociale from './components/Events/sociale';
import Animaux from './components/Events/animaux';
import Footer from './components/Footer/footer';
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

  // Function to update user data
  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <Router>
      <div>
        {/* Navbar Section */}
        <nav className="navbar">
          <h1 className="logo">نبض <span>التطوع</span></h1>
          <Link to="/" className="nav-button home-button">Accueil</Link>
          <div className="nav-buttons">
            <Link to="/signup" className="nav-button">S'inscrire</Link>
            <Link to="/login" className="nav-button">Se connecter</Link>
          </div>
        </nav>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/profile" element={<Profile userData={userData} updateUserData={updateUserData} />} />
          <Route path="/edit-profile" element={<EditProfile userData={userData} updateUserData={updateUserData} />} />
          <Route path="/accueil" element={<Acueil />} />
          <Route path="/sante" element={<Sante />} />
          <Route path="/sociale" element={<Sociale />} />
          <Route path="/animaux" element={<Animaux />} />
          <Route path="/publication" element={<Publication />} />
        </Routes>
      </div>

      {/* Footer Section */}
      <Footer />
    </Router>
  );
}

export default App;
