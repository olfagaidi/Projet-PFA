import React, { useState } from 'react'; 
import axios from 'axios'; 
import './SignUp.css';

const SignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    repassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSignUpFailed, setIsSignUpFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Champ obligatoire";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "L'e-mail doit être une adresse e-mail valide";

    if (!form.username) newErrors.username = "Champ obligatoire";

    if (!form.password) newErrors.password = "Champ obligatoire";
    else if (form.password.length < 3) newErrors.password = "Le mot de passe doit contenir au moins 3 caractères";

    if (!form.repassword) newErrors.repassword = "Champ obligatoire";
    else if (form.repassword !== form.password) newErrors.repassword = "Les mots de passe saisis ne correspondent pas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:8087/api/v1/auth/signup', form);
        console.log('Inscription réussie:', response.data);
        setIsSuccessful(true);
        setIsSignUpFailed(false);
        setForm({
          email: '',
          username: '',
          password: '',
          repassword: '',
        });
      } catch (err) {
        setIsSignUpFailed(true);
        setErrorMessage(err.response?.data?.message || "Une erreur s'est produite lors de l'inscription.");
        console.error("Erreur d'inscription:", err);
      }
    } else {
      setIsSignUpFailed(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className="form-login" onSubmit={onSubmit}>
      <div className="card card-container">
        <h2 className="form-login-heading">INSCRIVEZ-VOUS MAINTENANT</h2>

        {!isSuccessful && (
          <div className="login-wrap">
            <div className="form-row">
              <div className="col-6">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                <small className="text-danger">{errors.email}</small>
              </div>
              <div className="col-6">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Nom d'utilisateur"
                  required
                />
                <small className="text-danger">{errors.username}</small>
              </div>
            </div>

            <div className="form-row">
              <div className="col-6">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  required
                />
                <small className="text-danger">{errors.password}</small>
              </div>
              <div className="col-6">
                <label htmlFor="repassword">Confirmez le mot de passe</label>
                <input
                  type="password"
                  className={`form-control ${errors.repassword ? 'is-invalid' : ''}`}
                  name="repassword"
                  value={form.repassword}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  required
                />
                <small className="text-danger">{errors.repassword}</small>
              </div>
            </div>

            <button className="btn btn-theme btn-block" type="submit">
              <i className="fa fa-lock"></i> S'inscrire
            </button>

            {isSignUpFailed && (
              <div className="alert alert-warning">
                L'inscription a échoué !<br />{errorMessage}
              </div>
            )}
          </div>
        )}

        {isSuccessful && <div className="success">Vous vous êtes inscrit avec succès</div>}
      </div>
    </form>
  );
};

export default SignupForm;
