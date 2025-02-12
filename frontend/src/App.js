import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importation correcte pour React Router

import HomePage from './pages/HomePage'; // Supposons que vous ayez une page d'accueil (Home)
import VehicleDetailsPage from './pages/VehicleDetailsPage'; // Page des détails d'un véhicule

function App() {
  return (
    <Router> {/* Le Router entoure toutes les routes pour activer la gestion de la navigation */}
      <Routes> {/* Utilisation de Routes au lieu de Switch dans React Router v6 */}
        <Route path="/" element={<HomePage />} /> {/* Définition de la route pour la page d'accueil */}
        <Route path="/vehicle/:id" element={<VehicleDetailsPage />} /> {/* Route pour afficher les détails du véhicule */}
      </Routes>
    </Router>
  );
}

export default App; // Export du composant App pour le rendre disponible dans index.js