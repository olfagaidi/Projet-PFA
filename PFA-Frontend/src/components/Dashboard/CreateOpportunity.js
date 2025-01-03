import React, { useState } from 'react';
import './Dashboard.css';

const CreateOpportunity = ({ events, setEvents }) => {
  const [categorie, setCategorie] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();

    // Vérification de l'argument de setEvents
    if (typeof setEvents !== 'function') {
      console.error('setEvents is not a function. Please pass a valid function as a prop.');
      return;
    }

    // Création d'un nouvel événement
    const newEvent = {
      id: Date.now(),
      title,
      categorie,
      description,
      date,
      image,
    };

    // Mise à jour de la liste des événements
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    // Réinitialisation des champs de formulaire
    setCategorie('');
    setTitle('');
    setDescription('');
    setDate('');
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="form-card">
      <h2>Créer une Nouvelle Événement</h2>
      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label htmlFor="categorie">Catégorie :</label>
          <select
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="sante">Santé</option>
            <option value="sociaux">Sociaux</option>
            <option value="animaux">Animaux</option>
          </select>
        </div>
        <div className="form-group">
          <label>Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Date de l'Événement :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image :</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <img
              src={image}
              alt="Prévisualisation"
              className="image-preview"
            />
          )}
        </div>
        <button type="submit" className="button-primary">
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateOpportunity;
