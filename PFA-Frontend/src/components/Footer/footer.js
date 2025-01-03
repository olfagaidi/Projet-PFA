import React from 'react';
import './footer.css';  // Assurez-vous d'avoir ce fichier CSS pour les styles
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <footer className="footer">
      <MDBContainer>
        <MDBRow className="justify-content-center">
          {/* Icônes de réseaux sociaux */}
          <MDBCol md="12" className="text-center">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <MDBIcon fab icon="facebook" style={{ color: '#3b5998', fontSize: '2rem' }} className="mx-3" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <MDBIcon fab icon="twitter" style={{ color: '#55acee', fontSize: '2rem' }} className="mx-3" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <MDBIcon fab icon="instagram" style={{ color: '#ac2bac', fontSize: '2rem' }} className="mx-3" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <MDBIcon fab icon="linkedin" style={{ color: '#0077b5', fontSize: '2rem' }} className="mx-3" />
            </a>
          </MDBCol>
        </MDBRow>

        {/* Texte en bas */}
        <MDBRow>
          <MDBCol md="12" className="text-center mt-3">
            <p>&copy; 2024 Company Name. All rights reserved.</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </footer>
  );
};

export default Footer;
