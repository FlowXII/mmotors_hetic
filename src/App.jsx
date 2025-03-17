import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import LocationPage from "./pages/location/LocationPage";
import AccueilPage from "./pages/accueil/AccueilPage";
import AchatPage from "./pages/achat/AchatPage";
import ProductDetails from './components/product/ProductDetails';
import ProductDetailsAchat from './components/product/ProductDetailsAchat';
import { PopUpProvider, PopUpContext } from './context/PopUpContext';
import LoginPopUp from "./components/pop-up/auth/login/LoginPopUp";
import RegisterPopUp from "./components/pop-up/auth/register/RegisterPopUp";
import ReservationPopUp from "./components/pop-up/reservation/ReservationPopUp.jsx";

function App() {
  return (
    <PopUpProvider>
      <AppContent />
    </PopUpProvider>
  );
}

function AppContent() {
  const { popUpStatus, setPopUpStatus } = useContext(PopUpContext);

  return (
    <>
      <Navbar />
      {popUpStatus === 'login' && <LoginPopUp setPopUpStatus={setPopUpStatus} />}
      {popUpStatus === 'register' && <RegisterPopUp setPopUpStatus={setPopUpStatus} />}
      {popUpStatus === 'reservation' && <ReservationPopUp setPopUpStatus={setPopUpStatus} />}
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/achat" element={<AchatPage />} />
        <Route path="/location/:id" element={<ProductDetails />} />
        <Route path="/achat/:id" element={<ProductDetailsAchat />} />
      </Routes>
    </>
  );
}

export default App;