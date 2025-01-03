// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Auth/SignUp/SignUp';
import Home from './components/Home/Home';
import Accueil from './components/Accueil/Accueil';
import Acueil from './components/Accueil/acueil';
import Navbar from './components/Navbar/navbar';
import Profile from './components/Profil/profile';
import Publication from './components/Publication/publication';
import Sante from './components/Events/sante';
import Social from './components/Events/sociale';
import Animaux from './components/Events/animaux';
import Footer from './components/Footer/footer';
import EditProfile from './components/Profil/editprofile';
import LoginModal from './components/Auth/LoginModal'; // Import the LoginModal component
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Manage login state
  const [showLoginModal, setShowLoginModal] = useState(false); // Track if the modal is visible

  // Function to update user data
  const updateUserData = (newData) => {
    setUserData(newData);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);  // Show the modal when "Se connecter" is clicked
  };

  const closeLoginModal = () => {
    setShowLoginModal(false); // Close the modal when the user closes it
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} openLoginModal={openLoginModal} /> {/* Pass the openLoginModal function to Navbar */}
      
      {/* Routes for public pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/accueil" element={<Accueil />} />
      </Routes>

      {/* Show Login Modal if showLoginModal is true */}
      {showLoginModal && (
        <LoginModal setIsLoggedIn={setIsLoggedIn} closeModal={closeLoginModal} />
      )}

      {/* Main content (only visible when logged in) */}
      {isLoggedIn && (
        <div className="main-content">
          <Routes>
            <Route path="/profile" element={<Profile userData={userData} updateUserData={updateUserData} />} />
            <Route path="/edit-profile" element={<EditProfile userData={userData} updateUserData={updateUserData} />} />
            <Route path="/accueil" element={<Acueil />} />
            <Route path="/sante" element={<Sante />} />
            <Route path="/sociale" element={<Social />} />
            <Route path="/animaux" element={<Animaux />} />
            <Route path="/publication" element={<Publication />} />
          </Routes>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
