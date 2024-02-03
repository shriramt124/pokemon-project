import Search from "../Search/Search";
import PokemonList from "../PokemonList/PokemonList";
import { useState  } from "react";
import './Pokedex.css'
import { Link } from "react-router-dom";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
function Pokedex(){
  const [searchTerm,setSearchTerm] = useState("");
 return(
    <div className="pokedex-wrapper">
      <h1 className="pokedex-heading">
        <Link to={"/"}>pokedex</Link>
      </h1>

    <Search updateSearchTerm={setSearchTerm}/>
    {searchTerm}
{(!searchTerm) ? <PokemonList/>:<PokemonDetails key={searchTerm} pokemonName={searchTerm} />}

    </div>
 )
}
export default Pokedex;