import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.scss';

export default function ProductCard({ car }) {
    const navigate = useNavigate();

    return (
        <div className='product-card' onClick={() => navigate(`/achat/${car.id}`)}>
            <div className="top">
                <h4 className='title'>{car.name}</h4>
                <p className='cat'>{car.category}</p>
            </div>

            <div className="image-container">
                <img src={car.image} alt={car.name} />
            </div>

            <div className="bot">
                <div className="tarifs">
                    <h5>{car.price}€ / Jour</h5>
                    <p>A partir de {car.minDays} jours *</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); navigate(`/achat/${car.id}`); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                    </svg>
                </button>
            </div>
        </div>
    );
}
