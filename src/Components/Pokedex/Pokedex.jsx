import Search from "../Search/Search";
import PokemonList from "../PokemonList/PokemonList";
import './Pokedex.css'
import { Link } from "react-router-dom";
function Pokedex(){
 return(
    <div className="pokedex-wrapper">
      <h1 className="pokedex-heading">
        <Link to={"/"}>pokedex</Link>
      </h1>
    <Search/>
<PokemonList/>
    </div>
 )
}
export default Pokedex;