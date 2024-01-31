import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import './PokemonDetails.css'
import axios from 'axios'

function PokemonDetails() {

    const {id} = useParams()
   const [pokemon,setPokemons] = useState({})

   async function downloadPokemons(){
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            console.log(response.data);
            setPokemons({
                name:response.data.name,
                image:response.data.sprites.other.dream_world.front_default,
                weight:response.data.weight,
                height:response.data.height,
                types:response.data.types.map((t) => t.type.name)
            })
   }

   useEffect(()=>{
    downloadPokemons();
   },[])
  return (
    <div>
 <h1 className="pokedex-heading">
        <Link to={"/"}>pokedex</Link>
      </h1>
    
    <div className='pokemon-details-wrapper'>
        
      <img className='pokemon-details-image' src={pokemon.image} />
      <div className='pokemon-details-name'>name:{pokemon.name}</div>
      
     <div className='height'>Height is : {pokemon.height}</div>
     <div className='weight'>weight is : {pokemon.weight}</div>
     <div className='pokemon-details-types'>
      { pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>) }
     </div>
    </div>
    </div>
  )
}

export default PokemonDetails
