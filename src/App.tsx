import {  Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/nav/Navbar"
import LocationPage from "./pages/location/LocationPage"
import { PopUpContext, PopUpProvider } from "./context/PopUpContext";
import { useContext, useEffect } from "react";
import LoginPopUp from "./components/pop-up/auth/login/LoginPopUp";
import RegisterPopUp from "./components/pop-up/auth/register/RegisterPopUp";
import ReservationPopUp from "./components/pop-up/reservation/ReservationPopUp";
import LocationDetail from "./pages/detail/LocationDetail";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <PopUpProvider>
      <AppContent />
    </PopUpProvider>
  );
}


function AppContent() {

  const {popUpStatus, setPopUpStatus}= useContext(PopUpContext)

  const location= useLocation();

  useEffect(() => {
    if (location.pathname){
      // check si on est surlocationdetail 
      const rootElement = document.querySelector('body');
      if (rootElement) {
        if (location.pathname.includes('/location/')){
          rootElement.style.backgroundColor = '#252121';
        }
        else{
          rootElement.style.backgroundColor = '#fff';
        }
      }
    }
  }, [location])

  return (
    <>
      <Navbar />
      {popUpStatus === 'login' && <LoginPopUp />}
      {popUpStatus === 'register' && <RegisterPopUp />}
      {popUpStatus === 'reservation' && <ReservationPopUp />}
      <Routes>
        <Route path="/" element={<>accueik</>} />
        <Route path="/location" element={<LocationPage/>} />
        <Route path="/location/:id" element={<LocationDetail/>} />
        <Route path="/achat" element={<>achat</>} />
        <Route path="/achat/:id" element={<>achat</>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
