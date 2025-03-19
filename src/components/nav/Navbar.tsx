import React, { useContext } from 'react'
import './Navbar.scss'
import { Link, useLocation } from 'react-router-dom'
import { PopUpContext } from '../../context/PopUpContext'

export default function Navbar() {

    const nav = [
        { name: 'Accueil', path: '/' },
        { name: 'Location', path: '/location' },
        { name: 'Achat', path: '/achat' },
    ]

    const location = useLocation()

    const { setPopUpStatus } = useContext(PopUpContext);

    return (
        <div className="container">
            <div className='navbar'>
                <a href="/" className='logo'>
                    <img src="/logo/light.png" alt="logo" />
                </a>
                <nav>
                    <ul>
                        {
                            nav.map((item, index) => {
                                return (
                                    <li key={index}
                                        className={location.pathname === item.path ? 'active' : ''}
                                    >
                                        <Link to={item.path}>
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        setPopUpStatus('login');
                    }}
                    href="#" className="connect">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8754 16.1249V14.6527C14.8754 13.8718 14.5652 13.1229 14.013 12.5707C13.4608 12.0185 12.7119 11.7083 11.9309 11.7083H7.51427C6.73335 11.7083 5.98442 12.0185 5.43223 12.5707C4.88004 13.1229 4.56982 13.8718 4.56982 14.6527V16.1249M12.667 5.81938C12.667 7.44556 11.3488 8.76383 9.7226 8.76383C8.09643 8.76383 6.77816 7.44556 6.77816 5.81938C6.77816 4.19321 8.09643 2.87494 9.7226 2.87494C11.3488 2.87494 12.667 4.19321 12.667 5.81938Z" stroke="currentColor" strokeWidth="1.47222" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Me connecter
                </a>
            </div>
        </div>
    )
}
