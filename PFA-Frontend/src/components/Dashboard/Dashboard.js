import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.css';
import ReservationsList from './Reservation';
import CreateOpportunity from './CreateOpportunity';
import EventsList from './EventsList';
import EditEventForm from './CreateOpportunity'; // Si vous avez un formulaire de modification, il doit être utilisé ici.

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('opportunity');
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null); // Événement à modifier
  const [error, setError] = useState(null); // Gérer les erreurs
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Logique de déconnexion (mettre à jour l'état isLoggedIn et/ou rediriger)
    setIsLoggedIn(false);
    console.log('/Login');
    navigate('/login'); // Navigate to the login page
  };

  

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="sidebar-title">Organisateur</div>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-item ${activeSection === 'opportunity' ? 'active' : ''}`}
            onClick={() => setActiveSection('opportunity')}
          >
            Créer des Événements
          </li>
          <li
            className={`sidebar-item ${activeSection === 'events' ? 'active' : ''}`}
            onClick={() => setActiveSection('events')}
          >
            Liste des Événements
          </li>
          <li
            className={`sidebar-item ${activeSection === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveSection('reservations')}
          >
            Liste des Participants
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
      </nav>

      <div className="dashboard-content">
        <main>
          {error && <div style={{ color: 'red' }}>{error}</div>}

          {eventToEdit ? (
            <EditEventForm
              eventToEdit={eventToEdit}
              setEventToEdit={setEventToEdit}
              events={events}
              setEvents={setEvents}
            />
          ) : (
            <>
              {activeSection === 'opportunity' && (
                <CreateOpportunity events={events} setEvents={setEvents} />
              )}
              {activeSection === 'events' && (
                <EventsList
                  events={events}
                  setEvents={setEvents}
                  setEventToEdit={setEventToEdit}
                />
              )}
              {activeSection === 'reservations' && <ReservationsList />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
