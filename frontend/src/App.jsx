import {  Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import LocationPage from "./pages/location/LocationPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<>accueil</>} />
        <Route path="/location" element={<LocationPage/>} />
        <Route path="/achat" element={<>achat</>} />
      </Routes>
    </>
  );
}

export default App;
