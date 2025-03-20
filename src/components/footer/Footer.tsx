import { Link } from 'react-router-dom'
import './Footer.scss'

export default function Footer() {
  return (
    <footer>
        <div className='container'>
            <div className="col">
                <img src="/logo/light.png" alt="logo" />
                <p>Drive excellence.</p>
            </div>
            <div className="col">
                <a href="tel:+3312345678">+ 33 12 34 56 78 </a>
                <p>Av. Raja Gabáglia, 4343</p>
                <p>Santa Lucia</p>
            </div>
            <div className="col">
                <Link to='/'>Accueil</Link>
                <Link to='/location'>Location</Link>
                <Link to='/achat'>Achat</Link>
            </div>
            <div className="col">
                <p>© 2025 - M’Motors - Tous droits réservés.</p>
            </div>
        </div>
    </footer>
  )
}
