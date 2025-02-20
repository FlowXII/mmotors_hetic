import React from 'react';
import './LocationPage.scss';
import Select from '../../components/form/Select';
import ProductCard from '../../components/product/ProductCard';
import cars from '../../data/cars'; // Chemin mis à jour

export default function LocationPage() {
  return (
    <div className="location">
        <h2>Locations</h2>
        <p>Présentation des voitures disponibles...</p>
    
        <div className="filters">
            <Select name="Marque" options={["BMW", "Nissan", "Toyota"]}/>
            <Select name="Catégorie" options={["Sportive", "SUV", "Berline"]}/>
            <Select name="Prix" options={["< 300€", "300-500€", "> 500€"]}/>
        </div>

        <div className="products">
            {cars.map(car => <ProductCard key={car.id} car={car} />)}
        </div>
    </div>
  );
}
