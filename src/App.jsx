import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import LocationPage from './pages/location/LocationPage';
import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<>accueil</>} />
        <Route path="/location" element={<LocationPage/>} />
        <Route path="/achat" element={<>achat</>} />
        <Route path="/location/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}



export default App;