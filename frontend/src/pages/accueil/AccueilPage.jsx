import React from "react";
import "./AccueilPage.scss"; // Importando o CSS

function AccueilPage() {
  return (
    <div className="accueil-container">
      <h1 className="accueil-title">Bienvenue chez M-Motors</h1>
      <p className="accueil-text">
        Découvrez nos offres de location et d'achat de véhicules.
      </p>
      <button className="accueil-button">Voir nos véhicules</button>
    </div>
  );
}

export default AccueilPage;