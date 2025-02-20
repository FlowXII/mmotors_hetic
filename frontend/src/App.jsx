import { Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import LocationPage from "./pages/location/LocationPage";
import AccueilPage from "./pages/accueil/AccueilPage";
import LoginPage from "./pages/auth/LoginPage"; // Importation de la page de connexion

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
        <Route path="/achat" element={<>achat</>} />
        {/* Page de connexion */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;