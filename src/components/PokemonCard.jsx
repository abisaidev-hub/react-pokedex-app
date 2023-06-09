import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoadingData from './LoadingData';
import pokeball_placeholder from '../images/pokeball_placeholder.png';

const PokemonCard = ({pokemon}) => {

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
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ isLoadingData, setIsLoadingData ] = useState(false);
  //  React Router DOM
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingData(true);
    axios.get(pokemon)
      .then(res => setPokemonData(res.data))
      .finally(() => setIsLoadingData(false))
  }, [])

  const setColor = () => {
    for(let i in colors){
      if(colors[i].id === pokemonData.types?.[0].type.name){
        return colors[i].color
      }
    }
  };

  const setSecondColor = () => {
    for(let i in colors){
      if(colors[i].id === pokemonData.types?.[1].type.name){
        return colors[i].color
      }
    }
  };

  //  Javascript
  const pokemonName = pokemonData.name?.[0].toUpperCase() + pokemonData.name?.substring(1)
  const firstType = pokemonData.types?.[0]?.type?.name
  const secondType = pokemonData.types?.[1]?.type?.name
  const firstTypeFixed = firstType?.toUpperCase();
  const secondTypeFixed = secondType?.toUpperCase();

  return (
    <div onClick={() => navigate(`/pokedex/${pokemonData.id}`)}>
      <li className='pokemon-card' style={{backgroundColor: setColor()}}>
        <div className="p-c-bg">

        </div>
        <img src={pokemonData.sprites?.front_default}/>
        <div className="card-details">
          <div className="p-name">
            {isLoadingData ? (<LoadingData/>) :
              (<p><b>{pokemonName}</b></p>)
            }
          </div>
          <div className="t-details">
            {isLoadingData ? (<LoadingData/>) :
              (
                <p>{pokemonData.types?.[1] ? <><span className='p-d-type-details' style={{backgroundColor: setColor()}}>{firstTypeFixed}</span> <span className='p-d-type-details' style={{backgroundColor: setSecondColor()}}>{secondTypeFixed}</span></> : <span className='p-d-type-details' style={{backgroundColor: setColor()}}>{firstTypeFixed}</span>}</p>
              )
            }
          </div>
          <div className="f-details">
            {isLoadingData ? (<LoadingData/>) :
              (<>
                <div>
                  <p><b>Attack</b>: {pokemonData.stats?.[1].base_stat}</p>
                </div>
                <div>
                  <p><b>Defense</b>: {pokemonData.stats?.[2].base_stat}</p>
                </div>
              </>)
            }
          </div>
        </div>
      </li>
    </div>
  );
};

export default PokemonCard;