import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./ProductDetails.scss";
import CarSpecifications from "./CarSpecifications";

const cars = [
  { 
    id: "r34", 
    name: "NISSAN R34 GT-R", 
    category: "Sportive", 
    image: "/gtr.png", 
    price: 350, 
    minDays: 10,
    horsepower: 550,
    year: 2018,
    speed: 220,
    acceleration: 3.2,
    critair: 1
  },
  { 
    id: "r35", 
    name: "NISSAN R35 GT-R", 
    category: "Sportive", 
    image: "/gtr.png", 
    price: 400, 
    minDays: 8,
    horsepower: 600,
    year: 2020,
    speed: 250,
    acceleration: 2.9,
    critair: 1
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const car = cars.find((car) => car.id === id) || cars[0];

  return (
    <>
      <Helmet>
        <title>MMotors - {car.name}</title>
        <meta
          name="description"
          content={`Explore our exclusive luxury car rental options including the ${car.name}. Enjoy premium features for an unforgettable driving experience. Reserve now for special rates.`}
        />
      </Helmet>

      <div className="product-details">
        <section className="content">
          <h1 className="title">{car.name}</h1>
          <h2 className="category">{car.category}</h2>
          <p className="description">
            Too far is never far enough. Until we can design the very atoms of the materials in the car ourselves, we won’t stop.
            In the meantime, we’ve got our eye on every observable detail of the HF-11. Nothing is taken at face value, every component
            is interrogated, every function must dovetail perfectly with all others in an impossible pursuit of mechanical singularity.
            The devil’s never seen details like these. *Pre-production images shown.
          </p>
        </section>

        <section className="gallery">
          <div className="image-grid">
            <div className="main-image">
              <img src={car.image} alt="Thumbnail 1" />
            </div>
            <div className="image-thumbnails">
              <div className="thumbnail-row">
                <img src={car.image} alt="Thumbnail 1" />
              </div>
              <div className="thumbnail-row">
                <img src={car.image} alt="Thumbnail 3" />
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-container">
          <div className="price-info">
            <span className="price">{car.price}€ / Jour</span>
            <span className="min-days"> À partir de {car.minDays} jours *</span>
          </div>
          <button className="reserve-btn">RESERVER →</button>
        </section>
        <section className="car-specs">
          <CarSpecifications car={car} />
        </section>

        <footer className="similar-cars">
          <h2>Véhicules similaires</h2>
        </footer>
      </div>
    </>
  );
}
