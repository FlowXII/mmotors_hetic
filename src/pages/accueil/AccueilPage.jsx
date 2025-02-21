import React from "react";
import { Link } from "react-router-dom"; // Ajout de l'import manquant
import "./AccueilPage.scss"; // Import du fichier CSS

function AccueilPage() {
  return (
    <div className="accueil-container">
      <h1 className="accueil-title">Bienvenue chez M-Motors</h1>
      <p className="accueil-text">
        Découvrez nos offres de location et d'achat de véhicules.
      </p>

      <div className="button-group">
        <Link to="/achat" className="accueil-button">
          Voir nos véhicules à vendre
        </Link>
        <Link to="/location" className="accueil-button2">
          Voir nos véhicules à louer
        </Link>
      </div>
    </div>
  );
}

export default AccueilPage;
