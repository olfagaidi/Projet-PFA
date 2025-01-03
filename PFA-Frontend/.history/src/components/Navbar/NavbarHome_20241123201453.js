// src/components/Navbar/NavbarHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbarHome.css'; // Optionnel si vous avez un style spécifique pour cette navbar

const NavbarHome = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(1, 1, 1, 8)'}}>
    <nav className="navbar-home">
          <img src="/images/Logo.png" alt="Logo" className="logo" />
        <div className="nav-links">
        <Link to="/signup" className="nav-button">S'inscrire</Link>
        <Link to="/login" className="nav-button">Se connecter</Link>
      </div>
    </nav>
    </AppBar>
  );
};

export default NavbarHome;
