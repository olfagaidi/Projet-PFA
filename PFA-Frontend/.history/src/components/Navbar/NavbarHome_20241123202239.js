// src/components/Navbar/NavbarHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbarHome.css'; // Optionnel si vous avez un style spécifique pour cette navbar
import IconButton from '@mui/material/IconButton';

const NavbarHome = () => {
  return (
    <nav className="navbar-home">
<IconButton edge="start" color="inherit" aria-label="logo">
          <img src="/images/Logo.png" alt="Logo" className="logo" />
        <div className="nav-links">
        <Link to="/signup" className="nav-button">S'inscrire</Link>
        <Link to="/login" className="nav-button">Se connecter</Link>
      </div>
    </nav>
  );
};

export default NavbarHome;
