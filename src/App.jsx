import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import LocationPage from "./pages/location/LocationPage";
import AccueilPage from "./pages/accueil/AccueilPage";
import AchatPage from "./pages/achat/AchatPage";
import ProductDetails from './components/product/ProductDetails';
import ProductDetailsAchat from './components/product/ProductDetailsAchat';
import LoginPage from "./pages/auth/LoginPage"; // Importation de la page de connexion
import RegisterPage from "./pages/auth/RegisterPage"; // Importation de la page de connexion

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<AccueilPage />} />
        {/* Page de location */}
        <Route path="/location" element={<LocationPage />} />
        {/* Page d'achat */}
        <Route path="/achat" element={<AchatPage />} />
        {/* Page de connexion */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/location/:id" element={<ProductDetails />} />
        <Route path="/achat/:id" element={<ProductDetailsAchat />} />
        </Routes>
    </>
  );
}

export default App;