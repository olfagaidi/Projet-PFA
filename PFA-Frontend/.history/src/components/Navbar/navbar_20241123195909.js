import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout'; // Icône de déconnexion
import './navbar.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simuler un état de connexion

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // Logique de déconnexion (mettre à jour l'état isLoggedIn et/ou rediriger)
    setIsLoggedIn(false);
    console.log('/Login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(1, 1, 1, 8)'}}>
      <Toolbar className="toolbar">
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src="/images/Logo.png" alt="Logo" className="logo" />
        </IconButton>

        {/* Liens de navigation */}
        <div className="nav-links">
          <Link to="/accueil" className="link">
            <Button color="inherit">Accueil</Button>
          </Link>
          <Button color="inherit" onClick={handleMenu}>
            Events
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/sante">
              Santé
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/sociale">
              Sociale
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/animaux">
              Animaux
            </MenuItem>
          </Menu>
          <Link to="/publication" className="link">
            <Button color="inherit">Publication</Button>
          </Link>
          <Link to="/profile" className="link">
            <Button color="inherit">Profil</Button>
          </Link>
          {/* <Link to="/event" className="link">
            <Button color="inherit">Events</Button>
          </Link>
          <Link to="/homepage" className="link">
            <Button color="inherit">Home</Button>
          </Link> */}
          
        </div>

        {/* Bouton de connexion */}
{/* Si l'utilisateur est connecté, afficher le logo de déconnexion */}
<IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon /> {/* Icône de déconnexion */}
        </IconButton>      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
