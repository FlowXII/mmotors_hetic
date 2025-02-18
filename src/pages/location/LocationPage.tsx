import React from 'react'
import './LocationPage.scss'
import Select from '../../components/form/Select'
import ProductCard from '../../components/product/ProductCard'

export default function LocationPage() {
  return (
    <div className="location">
        <h2>Locations</h2>
        <p>Too far is never far enough. Until we can design the very atoms of the materials in the car ourselves, we won’t stop. In the meantime, we’ve got our eye on every observable detail of the HF-11. Nothing is taken at face value, every component is interrogated, every function must dovetail perfectly with all others in an impossible pursuit of mechanical singularity. The devil’s never seen details like these. *Pre-production images shown.</p>
    
        <div className="filters">
            <Select name="Marque" options={["bmw", "cacaw", "prout"]}/>
            <Select name="Marque" options={["bmw", "cacaw", "prout"]}/>
            <Select name="Marque" options={["bmw", "cacaw", "prout"]}/>
        </div>

        <div className="products">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    
    </div>
  )
}
