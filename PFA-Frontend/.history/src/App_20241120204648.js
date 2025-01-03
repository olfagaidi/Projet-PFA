// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/Login/Login';
import Home from './components/Home/Home';
import Accueil from './components/Accueil/Accueil';
import Accueil

import './App.css';


function App() {
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
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/event" element={<Event />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sante" element={<Sante />} />
            <Route path="/sociale" element={<Sociale />} />
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
