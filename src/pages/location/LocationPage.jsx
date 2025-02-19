import React from 'react';
import './LocationPage.scss';
import Select from '../../components/form/Select';
import ProductCard from '../../components/product/ProductCard';

// Liste des voitures
const cars = [
    { id: "r34", name: "NISSAN R34 GT-R", category: "Sportive", image: "/gtr.png", price: 350, minDays: 10 },
    { id: "r35", name: "NISSAN R35 GT-R", category: "Sportive", image: "/car1.jpg", price: 400, minDays: 8 }
];

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
