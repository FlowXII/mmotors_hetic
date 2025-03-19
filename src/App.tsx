import {  Route, Routes } from "react-router-dom"
import Navbar from "./components/nav/Navbar"
import LocationPage from "./pages/location/LocationPage"
import { PopUpContext, PopUpProvider } from "./context/PopUpContext";
import { useContext } from "react";
import LoginPopUp from "./components/pop-up/auth/login/LoginPopUp";
import RegisterPopUp from "./components/pop-up/auth/register/RegisterPopUp";
import ReservationPopUp from "./components/pop-up/reservation/ReservationPopUp";

function App() {
  return (
    <PopUpProvider>
      <AppContent />
    </PopUpProvider>
  );
}


function AppContent() {

  const {popUpStatus, setPopUpStatus}= useContext(PopUpContext)

  return (
    <>
      <Navbar />
      {popUpStatus === 'login' && <LoginPopUp />}
      {popUpStatus === 'register' && <RegisterPopUp />}
      {popUpStatus === 'reservation' && <ReservationPopUp />}
      <Routes>
        <Route path="/" element={<>accueik</>} />
        <Route path="/location" element={<LocationPage/>} />
        <Route path="/achat" element={<>achat</>} />
      </Routes>
    </>
  )
}

export default App
