import React, { useEffect, useRef, useState } from 'react';
import './acueil.css';
import { useNavigate } from 'react-router-dom';

function Accueil() {
  const navigate = useNavigate();

  // NsihetMjarrebPart: Part for the images and automatic scrolling
  const NsihetMjarrebPart = () => {
    const imageListRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
      '/images/event1.avif',
      '/images/event2.avif',
      '/images/event3.avif',
      '/images/event4.avif',
      '/images/event5.avif',
      '/images/event6.avif',
      '/images/event7.avif'
    ];

    // Auto change image every 3 seconds
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      // Cleanup interval when component unmounts
      return () => clearInterval(intervalId);
    }, [images.length]);

    // Handle scroll left and right
    const scrollImages = (direction) => {
      if (direction === 'left') {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else if (direction === 'right') {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };

    return (
      <div className="nsihet-mjarreb-part">
        <div className="part-label">
          Événements de Saaed - Découvrez nos derniers événements
        </div>

        {/* Container for images with scroll buttons */}
        <div className="nsihet-mjarreb-container">
          

          {/* Scrollable image list */}
          <div className="image-list" ref={imageListRef}>
            <img src={images[currentImageIndex]} alt={`Événement ${currentImageIndex + 1}`} />
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="categories-container">
        {/* Category: Santé */}
        <div className="category-container">
          <div className="left-part">
            <div className="category-titles">
              <div className="category-title">Santé</div>
              <div className="category-subtitle">Découvrez les meilleurs produits de santé</div>
            </div>
            <div className="bottom-part" onClick={() => navigate('/sante')}>
              En savoir plus
            </div>
          </div>
          <div className="right-part">
            <img src='/images/s22.jpg' alt="Santé" />
          </div>
        </div>

        {/* Category: Sociale */}
        <div className="category-container">
          <div className="left-part">
            <div className="category-titles">
              <div className="category-title">Sociale</div>
              <div className="category-subtitle">Découvrez les meilleurs produits sociaux</div>
            </div>
            <div className="bottom-part" onClick={() => navigate('/sociale')}>
              En savoir plus
            </div>
          </div>
          <div className="right-part">
            <img src="/images/soc-removebg-preview.png" alt="Sociale" />
          </div>
        </div>

        {/* Category: Animaux */}
        <div className="category-container">
          <div className="left-part">
            <div className="category-titles">
              <div className="category-title">Animaux</div>
              <div className="category-subtitle">Découvrez les meilleurs produits pour vos animaux</div>
            </div>
            <div className="bottom-part" onClick={() => navigate('/animaux')}>
              En savoir plus
            </div>
          </div>
          <div className="right-part">
            <img src="/images/animaux.avif" alt="Animaux" />
          </div>
        </div>
      </div>

      {/* Nsihet Mjarreb Part */}
      <NsihetMjarrebPart />
    </div>
  );
}

export default Accueil;