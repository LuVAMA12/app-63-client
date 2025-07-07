import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false) 
  return (
    <header>
      <Link to='/' className="logo"><img src="/images/logo.png" alt="Logo Le 63 restaurant"/></Link>
      <img className='menu-icon' src="/icons/burger-icon.svg" alt="Burger Menu - Appuyez pour ouvrir le menu" onClick={() => setIsOpenMenu(!isOpenMenu)} />
      {isOpenMenu &&
        <nav className="navbar">
            <Link to="/">Accueil</Link>
            <Link to="/reservations">Reservation</Link>
        </nav>
        }
    </header>
  )
}

export default Header