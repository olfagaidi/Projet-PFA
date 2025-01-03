import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function EditProfile({ userData, updateUserData }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(userData);
  const [profileImage, setProfileImage] = useState(userData.profileImage || ''); // Image de profil

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUserData({ ...formData, profileImage });
    navigate('/profile');
  };

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center mt-5">
        <MDBCol lg="6">
          <MDBCard>
            <MDBCardBody>
              <h3 className="mb-4">Modifier les informations</h3>
              <div className="mb-3">
                <label>Photo de profil</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Nom utilisateur</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Naissance</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Poste</label>
                <input
                  type="text"
                  name="category"
                  value={formData.poste}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="d-flex justify-content-end">
                <MDBBtn color="success" onClick={handleSave}>Enregistrer</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
