import React from 'react'
import './ProductCard.scss'

export default function ProductCard() {
    return (
        <div className='product-card'>
            <div className="top">
                <h4 className='title'>NISSAN R34 GT-R</h4>
                <p className='cat'>Sportive</p>
            </div>

            <div className="image-container">
                <img src="/gtr.png" alt="" />
            </div>

            <div className="bot">
                <div className="tarifs">
                    <h5>350€ / Jour</h5>
                    <p>A partir de 10 jours *</p>
                </div>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

        </div>
    )
}
