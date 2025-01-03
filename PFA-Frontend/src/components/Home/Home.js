import React from 'react';
import { Link } from 'react-router-dom'; // Importez uniquement Link, pas BrowserRouter

import './Home.css';

function Home() {
  return (
    <>
      
       
      

      <div className="home-content">
        <div className="text-section">
          <p>
            <strong>B</strong>ienvenue à <strong style={{ color: '#4ECDC4' }}>ساعد</strong> . <br />
            Cette plateforme réunit ceux qui veulent donner de leur temps <br /> et ceux qui ont besoin de soutien. <br />
            Ensemble, faisons une réelle différence dans nos communautés.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
