import React, { useEffect } from 'react'
import pokedexicon from '../images/pokedexicon.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='pokemon-details-container'>
      <div className="pokedex-title">        
        <img src={pokedexicon} alt=""/>
        <h1>Pokedex</h1>
      </div>
      <div className="full-pokemon-container">
        <button onClick={() => navigate('/pokedex')}>
          <i className='bx bxs-chevron-left bx-xs' ></i>
        </button>
        <div className="pokemon-details-card not-found-card">
          <h2>Pokemon not found</h2>
        </div>
      </div>
      <div className="pokedex__footer">
        <ul className="footer__social-media">
          <li><a className="footer__link" href="https://www.linkedin.com/in/abisaidev" target='_blank'>LinkedIn</a></li>
          <span>|</span>
          <li><a className="footer__link" href="https://github.com/abisaidev-hub" target='_blank'>GitHub</a></li>
        </ul>
        <p>© Abisai Luna</p>
      </div>
    </div>
  );
};

export default NotFound;