import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import Signup from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/Login/Login';
import Home from './components/Home/Home';
import Accueil from './components/Accueil/acueil';
import Navbar from './components/Navbar/navbar';
import Profile from './components/Profil/profile';
import EditProfile from './components/Profil/editprofile';
import Publication from './components/Publication/publication';
import Sante from './components/Events/sante';
import Sociale from './components/Events/sociale';
import Animaux from './components/Events/animaux';
import Footer from './components/Footer/footer';
import Chatbot from './components/Chatbot/Chatbot';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

// Fonction ProtectedRoute
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [userData, setUserData] = useState({
    name: 'Olfa Gaidi ',
    email: 'olfa@gmail.com',
    phone: '(216) 51819776',
    address: 'Béja, Tunis',
    poste: 'Pharmacienne Biologiste',
    date: '12/11/1995',
    role: 'admin',
  });

  const [activeSection, setActiveSection] = useState('opportunity');

  // Fonction pour mettre à jour les données de l'utilisateur
  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <Router>
      <Content
        userData={userData}
        activeSection={activeSection}
        updateUserData={updateUserData}
      />
    </Router>
  );
}

function Content({ userData, activeSection, updateUserData }) {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isAuthPage = ['/login', '/signup', '/'].includes(location.pathname); // Check if it's login, signup, or home page

  return (
    <div className="App">
      {/* Display Navbar only if it's not an auth page */}
      {!isDashboard && !isAuthPage && <Navbar />}
   
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <div>
            {/* Only show the minimal Navbar for Signup page */}
            <nav className="navbar">
              <h1 className="logo"> <span>ساعد</span></h1>
              <Link to="/" className="nav-button home-button">Accueil</Link>
              <div className="nav-buttons">
                <Link to="/signup" className="nav-button">S'inscrire</Link>
                <Link to="/login" className="nav-button">Se connecter</Link>
              </div>
            </nav>
            
            <Home />
            </div>
            }/>
          <Route
            path="/signup"
            element={
              <div>
                {/* Only show the minimal Navbar for Signup page */}
                <nav className="navbar">
                  <h1 className="logo"> <span>ساعد</span></h1>
                  <Link to="/" className="nav-button home-button">Accueil</Link>
                  <div className="nav-buttons">
                    <Link to="/signup" className="nav-button">S'inscrire</Link>
                    <Link to="/login" className="nav-button">Se connecter</Link>
                  </div>
                </nav>
                <Signup />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                {/* Only show the minimal Navbar for Login page */}
                <nav className="navbar">
                  <h1 className="logo"> <span>ساعد</span></h1>
                  <Link to="/" className="nav-button home-button">Accueil</Link>
                  <div className="nav-buttons">
                    <Link to="/signup" className="nav-button">S'inscrire</Link>
                    <Link to="/login" className="nav-button">Se connecter</Link>
                  </div>
                </nav>
                <Login />
              </div>
            }
          />
          <Route path="/profile" element={<Profile userData={userData} updateUserData={updateUserData} />} />
          <Route path="/edit-profile" element={<EditProfile userData={userData} updateUserData={updateUserData} />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/sante" element={<Sante />} />
          <Route path="/sociale" element={<Sociale />} />
          <Route path="/animaux" element={<Animaux />} />
          <Route path="/publication" element={<Publication />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={userData.role === 'admin'}>
                <Dashboard activeSection={activeSection} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
   {/* Display Footer and Chatbot only if it's not an auth page */}
      {!isDashboard && !isAuthPage && <Chatbot />}
      {!isDashboard && !isAuthPage && <Footer />}

    </div>
  );
}

export default App;