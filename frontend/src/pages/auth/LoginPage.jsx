import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss"; // Importation du fichier CSS

function LoginPage() {
  const navigate = useNavigate(); // Permet de naviguer après la connexion

  // Fonction qui simule la connexion
  const handleLogin = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    alert("Connexion réussie !");
    navigate("/"); // Redirige vers la page d'accueil après la connexion
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        {/* Champ pour l'email */}
        <label>Email</label>
        <input type="email" placeholder="Entrez votre email" required />

        {/* Champ pour le mot de passe */}
        <label>Mot de passe</label>
        <input type="password" placeholder="Entrez votre mot de passe" required />

        {/* Bouton de connexion */}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginPage;