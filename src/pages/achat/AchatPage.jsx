import React from 'react';
import './AchatPage.scss';
import Select from '../../components/form/Select';
import ProductCard from '../../components/product/ProductCardAchat';
import carsachat from '../../data/carsachat'; // Assurez-vous que ce fichier contient les voitures à vendre

export default function AchatPage() {
  return (
    <div className="achat">
        <h2>Achat</h2>
        <p>Découvrez notre sélection de véhicules disponibles à l'achat.</p>
    
        <div className="filters">
            <Select name="Marque" options={["BMW", "Nissan", "Toyota", "Mercedes", "Audi"]}/>
            <Select name="Catégorie" options={["Sportive", "SUV", "Berline", "Utilitaire"]}/>
            <Select name="Prix" options={["< 10 000€", "10 000-30 000€", "> 30 000€"]}/>
        </div>

        <div className="products">
            {carsachat.map(car => <ProductCard key={car.id} car={car} />)}
        </div>
    </div>
  );
}
