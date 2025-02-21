import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss"; // Réutilisation du même fichier CSS

function RegisterPage() {
  const navigate = useNavigate(); // Permet de naviguer après l'inscription

  // Fonction qui simule l'inscription
  const handleRegister = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    alert("Inscription réussie !");
    navigate("/login"); // Redirige vers la page de connexion après l'inscription
  };

  return (
    <div className="login-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        {/* Champ pour le nom d'utilisateur */}
        <label>Nom d'utilisateur</label>
        <input type="text" placeholder="Entrez votre nom d'utilisateur" required />

        {/* Champ pour l'email */}
        <label>Email</label>
        <input type="email" placeholder="Entrez votre email" required />

        {/* Champ pour le mot de passe */}
        <label>Mot de passe</label>
        <input type="password" placeholder="Entrez votre mot de passe" required />

        {/* Bouton d'inscription */}
        <button type="submit">S'inscrire</button>
      </form>

      {/* Bouton pour retourner à la connexion */}
      <button className="register-button" onClick={() => navigate("/login")}>
        Déjà un compte ? Se connecter
      </button>
    </div>
  );
}

export default RegisterPage;
