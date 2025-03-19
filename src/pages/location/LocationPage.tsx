import React from 'react'
import './LocationPage.scss'
import Select from '../../components/form/select/Select'
import ProductCard from '../../components/product/ProductCard'
import Button from '../../components/form/button/Button'

export default function LocationPage() {

  const [marque, setMarque] = React.useState("Tout")
  const [prix, setPrix] = React.useState("Tout")
  const [categorie, setCategorie] = React.useState("Tout")
  
  const marqueOptions = ["Tout","bmw", "cacaw", "prout"]
  const prixOptions = ["Tout","0-1000", "1000-2000", "2000-3000", "3000-4000", "4000-5000", "5000-6000", "6000-7000", "7000-8000", "8000-9000", "9000-10000"]
  const categorieOptions = ["Tout","SUV", "Berline", "Sportive", "Utilitaire", "Citadine", "Cabriolet", "Monospace", "Pick-up", "Coupé"]

  return (
    <div className="location">
        <h2>Locations</h2>
        <p>Too far is never far enough. Until we can design the very atoms of the materials in the car ourselves, we won’t stop. In the meantime, we’ve got our eye on every observable detail of the HF-11. Nothing is taken at face value, every component is interrogated, every function must dovetail perfectly with all others in an impossible pursuit of mechanical singularity. The devil’s never seen details like these. *Pre-production images shown.</p>
    
        <div className="filters-search"
        style={{margin: "5rem 0 2rem 0"}}
        >
          <div className="filters">
            <Select name="Marque" options={marqueOptions} selected={marque} setSelected={setMarque}/>
            <Select name="Prix" options={prixOptions} selected={prix} setSelected={setPrix}/>
            <Select name="Catégorie" options={categorieOptions} selected={categorie} setSelected={setCategorie}/>
          </div>
          <Button>Rechercher</Button>
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
