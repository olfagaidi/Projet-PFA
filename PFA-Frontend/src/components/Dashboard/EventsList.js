import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const EventsList = ({ setEventToEdit }) => {
  const navigate = useNavigate();

  // Événements statiques
  const [events, setEvents] = useState([
    {
      id: 1,
      categorie: "Animaux",
      title: "Rage",
      date: "04/01/2025",
      description: "La rage est une maladie virale grave qui peut affecter les animaux et se transmettre aux humains. Pour protéger vos animaux de compagnie et assurer la sécurité de la communauté, participez à notre campagne de vaccination contre la rage.",
      image: "/images/chiens.jpg"
    },
    {
      id: 2,
      categorie: "Sociaux",
      title: "Chakan Fater",
      date: "14/03/2025",
      description: "Rejoignez-nous pour l'événement Chakan Fater, une initiative sociale dédiée au partage et à la solidarité envers les personnes dans le besoin. Cet événement consiste à distribuer des repas chauds aux familles démunies et aux sans-abris, en leur offrant non seulement de la nourriture, mais aussi un moment de convivialité et de chaleur humaine.",
      image: "/images/chakan.jpg"
    },
    {
      id: 3,
      categorie: "Santé",
      title: "Octobre Rose",
      date: "24/10/2025",
      description: "Chaque année, le mois d'Octobre Rose est dédié à la sensibilisation au cancer du sein. Cet événement a pour objectif de mobiliser, informer et soutenir les femmes, ainsi que leurs proches, dans la lutte contre cette maladie.",
      image: "/images/rose.jpg"
    },
  ]);

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id)); // Supprime l'événement par son ID
  };

  const handleEdit = (event) => {
    setEventToEdit(event);
    navigate("/dashboard"); // Redirige vers la page de modification
  };

  return (
    <div className="events-list">
      <h2>Liste des Événements</h2>
      {events.length === 0 ? (
        <p>Aucun événement créé pour le moment.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-card-body">
                <strong>Catégorie : {event.categorie}</strong>
                <h3>Titre : {event.title}</h3>
                <small>Date : {event.date}</small>
                <p>Description : {event.description}</p>
                {event.image && (
                  <img
                    src={event.image}
                    alt="Événement"
                    className="event-image"
                  />
                )}
              </div>
              <div className="event-card-footer">
                <button
                  className="button-primary"
                  onClick={() => handleEdit(event)} // Bouton Modifier
                >
                  Modifier
                </button>
                <button
                  className="button-danger"
                  onClick={() => handleDelete(event.id)} // Bouton Supprimer
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
