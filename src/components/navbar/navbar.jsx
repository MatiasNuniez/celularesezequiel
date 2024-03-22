import React from 'react'
import img_nav from '../../assets/logo_nav.png'
import { useLocation } from 'react-router-dom'

export const Navbar = () => {

  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"><img src={img_nav} alt="Logo"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Base_de_datos">Base de datos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Prestados">Prestados</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Rotos">Rotos</a>
            </li>
          </ul>
        </div>
      </nav>
  );
}
