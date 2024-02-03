import { useEffect ,useState} from "react"
 import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css'
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList() {
   
const [setPokemonListState,pokemonListstate] = usePokemonList();

     
    
  return (
    <div className="pokemon-list-wrapper">
  
     <div className="pokemon-wrapper">
        {(pokemonListstate.isLoading)?"loading.." : 
       pokemonListstate.pokemonList.map((p)=> <Pokemon image={p.image} name={p.name} key={p.id} id={p.id}/>)}
       </div>
       <div className="controls">
            <button disabled={pokemonListstate.prevUrl === null} onClick={()=>setPokemonListState((state)=> ({...state,pokedexUrl:pokemonListstate.prevUrl}))}>prev</button>
            <button disabled={pokemonListstate.nextUrl === null} onClick={()=>setPokemonListState((state)=>({...state,pokedexUrl:pokemonListstate.nextUrl}))}>next</button>
        </div>
    </div>
  )


}

export default PokemonList;
 