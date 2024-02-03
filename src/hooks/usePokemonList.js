 import { useState,useEffect } from "react"
import axios from "axios";
function usePokemonList() {
    const [pokemonListstate,setPokemonListState] = useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:"https://pokeapi.co/api/v2/pokemon",
        nextUrl:'',
        prevUrl:'',
       })

       async function downloadPokemons(){
        setPokemonListState( (state) => ({...state,isLoading:true}));
        const response = await axios.get(pokemonListstate.pokedexUrl);
         const pokemonResults = response.data.results;
         setPokemonListState((state) => ({...state,
          nextUrl:response.data.next,
          prevUrl:response.data.previous
        }));
       
       const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url))
  
       const pokemonData =  await axios.all(pokemonResultPromise);
       
        const res = pokemonData.map((pokeData)=>{
           const pokemon = pokeData.data;
           return {
              id:pokemon.id,
              name:pokemon.name,
              image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
              types:pokemon.types
           }
        })
       
        setPokemonListState( (state)=> (
          {...state,
            pokemonList:res,
            isLoading:false
          }));
         
      }


      useEffect(()=>{
        downloadPokemons();

  },[pokemonListstate.pokedexUrl])


  return [setPokemonListState,pokemonListstate] ;
}

export default usePokemonList
