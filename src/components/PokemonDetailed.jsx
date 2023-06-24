import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import pokedexicon from '../images/pokedexicon.png';
import LoadingData from './LoadingData';
import pokeball_placeholder from '../images/pokeball_placeholder.png';

const PokemonDetailed = () => {

  //  Colors array
  const colors = [
    {
      id: 'normal',
      color: 'rgb(168, 168, 120)'
    },
    {
      id: 'fighting',
      color: 'rgb(192, 48, 40)'
    },
    {
      id: 'flying',
      color: 'rgb(168, 144, 240)'
    },
    {
      id: 'poison',
      color: 'rgb(160, 64, 160)'
    },
    {
      id: 'ground',
      color: 'rgb(224, 192, 104)'
    },
    {
      id: 'rock',
      color: 'rgb(184, 160, 56)'
    },
    {
      id: 'bug',
      color: 'rgb(168, 184, 32)'
    },
    {
      id: 'ghost',
      color: 'rgb(112, 88, 152)'
    },
    {
      id: 'steel',
      color: 'rgb(184, 184, 208)'
    },
    {
      id: 'fire',
      color: 'rgb(240, 128, 48)'
    },
    {
      id: 'water',
      color: 'rgb(104, 144, 240)'
    },
    {
      id: 'grass',
      color: 'rgb(120, 200, 80)'
    },
    {
      id: 'electric',
      color: 'rgb(248, 208, 48)'
    },
    {
      id: 'psychic',
      color: 'rgb(248, 88, 136)'
    },
    {
      id: 'ice',
      color: 'rgb(152, 216, 216)'
    },
    {
      id: 'dragon',
      color: 'rgb(112, 56, 248)'
    },
    {
      id: 'dark',
      color: 'rgb(112, 88, 72)'
    },
    {
      id: 'fairy',
      color: 'rgb(238, 153, 172)'
    },
    {
      id: 'unknown',
      color: 'rgb(104, 160, 144)'
    },
  ]

  //  React
  const [ pokemonDetails, setPokemonDetails ] = useState([]);
  const [ moves, setMoves ] = useState([]);
  const [ isLoadingData, setIsLoadingData ] = useState(false);
  //  React Router DOM
  const { pokeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoadingData(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then(res => {
        setPokemonDetails(res.data)
        setMoves(res.data.moves)
      })
      .catch(() => navigate('/pokedex/notfound'))
      .finally(() => setIsLoadingData(false))
  }, [])

  const setColor = () => {
    for(let i in colors){
      if(colors[i].id === pokemonDetails.types?.[0].type.name){
        return colors[i].color
      }
    }
  };

  const setSecondColor = () => {
    for(let i in colors){
      if(colors[i].id === pokemonDetails.types?.[1].type.name){
        return colors[i].color
      }
    }
  };

  //  Javascript
  const pokemonName = pokemonDetails.name?.[0].toUpperCase() + pokemonDetails.name?.substring(1)
  const firstType = pokemonDetails.types?.[0]?.type?.name
  const secondType = pokemonDetails.types?.[1]?.type?.name
  const firstTypeFixed = firstType?.toUpperCase()
  const secondTypeFixed = secondType?.toUpperCase()
  const pHeight = (pokemonDetails.height / 10)
  const pWeight = (pokemonDetails.weight / 10)

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
        <div className="pokemon-details-card" style={{backgroundColor: setColor()}}>
          {isLoadingData ? (<img src={pokeball_placeholder} className='pokeball-spinning'/>) :
            (<img src={pokemonDetails.sprites?.other.home.front_default}/>)
          }
          <div className="p-d-info">
            <div className="p-d-pname">
              {isLoadingData ? (<LoadingData />) :
                (<p><b>{pokemonName}</b></p>)
              }
            </div>
            <div className="p-d-type">
              <div className="p-d-type-title">
                {isLoadingData ? (<LoadingData />) :
                  (<p><b>Type</b></p>)
                }
              </div>
              <div className="p-d-type-info">
                {isLoadingData ? (<LoadingData />) :
                  (
                    <p>{pokemonDetails.types?.[1] ? <><span className='p-d-type-details' style={{backgroundColor: setColor()}}>{firstTypeFixed}</span> <span className='p-d-type-details' style={{backgroundColor: setSecondColor()}}>{secondTypeFixed}</span></> : <span className='p-d-type-details' style={{backgroundColor: setColor()}}>{firstTypeFixed}</span>}</p>
                  )
                }
              </div>
            </div>
            <div className="p-d-hnw">
              <div className="p-d-hnw-title">
              {isLoadingData ? (<LoadingData />) :
                (
                  <>
                    <p><b>Height</b></p>
                    <p><b>Weight</b></p>
                  </>
                )
              }
              </div>
              <div className="p-d-hnw-description">
                {isLoadingData ? (<LoadingData />) :
                  (
                    <>
                      <p>{pHeight} m</p>
                      <p>{pWeight} kg</p>
                    </>
                  )
                }
              </div>
            </div>
            <div className="p-d-stats-container">
              <div className="p-d-stats-title">
                {isLoadingData ? (<LoadingData />) :
                  (<p><b>Stats</b></p>)
                }
              </div>
              <div className="p-d-stat-container">
                {isLoadingData ? (<LoadingData />) :
                  (
                    <>                    
                      <p>HP</p>
                      <div className="p-d-stat-bar">
                        <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[0].base_stat}px`}}>
                          <p>{`${pokemonDetails.stats?.[0].base_stat}/150`}</p>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="p-d-stat-container">
                {isLoadingData ? (<LoadingData />):
                  (
                    <>                    
                      <p>Attack</p>
                      <div className="p-d-stat-bar">
                        <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[1].base_stat}px`}}>
                          <p>{`${pokemonDetails.stats?.[1].base_stat}/150`}</p>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="p-d-stat-container">
                {isLoadingData ? (<LoadingData />):
                  (
                    <>                    
                      <p>Defense</p>
                      <div className="p-d-stat-bar">
                        <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[2].base_stat}px`}}>
                          <p>{`${pokemonDetails.stats?.[2].base_stat}/150`}</p>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="p-d-stat-container">
                {isLoadingData ? (<LoadingData />):
                  (
                    <>                    
                      <p>Speed</p>
                      <div className="p-d-stat-bar">
                        <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[3].base_stat}px`}}>
                          <p>{`${pokemonDetails.stats?.[3].base_stat}/150`}</p>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
            <div className="p-d-extra-stats-container">
              <div className="p-d-stats-title">
                {isLoadingData ? (<LoadingData />):
                  (<p><b>Extra stats</b></p>)
                }
              </div>
              <div className="p-d-stat-container">
                {isLoadingData ? (<LoadingData />):
                  (
                    <>                    
                      <p>Special attack</p>
                      <div className="p-d-stat-bar">
                        <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[4].base_stat}px`}}>
                          <p>{`${pokemonDetails.stats?.[4].base_stat}/150`}</p>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="p-d-stat-container">
                {isLoadingData ? (<LoadingData />):
                  (
                    <>                    
                      <p>Special defense</p>
                      <div className="p-d-stat-bar">
                        <div className="p-d-stat-bar-filled" style={{width: `${pokemonDetails.stats?.[5].base_stat}px`}}>
                          <p>{`${pokemonDetails.stats?.[5].base_stat}/150`}</p>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="p-d-moves-card">
          <div className="p-d-moves-container">
            <div className="p-d-moves-title">
              {isLoadingData ? (<LoadingData />) :
                (<p><b>Moves</b></p>)
              }
            </div>
            {isLoadingData ?
              (
                <ul className='p-d-moves-ul ul-loading'>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                  <li><LoadingData /></li>
                </ul>
              )
              :
              (
                <ul className='p-d-moves-ul'>
                  {moves.map(move => (
                    <li key={move.move.name}>
                      <p>{(move.move.name)[0].toUpperCase()+(move.move.name).substring(1).replace('-', ' ')}</p>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
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

export default PokemonDetailed;