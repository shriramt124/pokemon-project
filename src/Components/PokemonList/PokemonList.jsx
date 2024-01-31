import { useEffect ,useState} from "react"
 import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css'
function PokemonList() {
 
     const [pokemonList,setpokemonList] = useState([])
       const [isLoading,setIsLoading] = useState(true);
      const [pokedexUrl,setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon");
        const[nextUrl,setNexturl] = useState("")
        const [prevUrl,setPrevUrl] = useState("");

    async function downloadPokemons(){
        setIsLoading(true);
      const response = await axios.get(pokedexUrl);

       const pokemonResults = response.data.results;
       setNexturl(response.data.next);
       setPrevUrl(response.data.previous);
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
     
      setpokemonList(res);
       setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();

  },[pokedexUrl])
  return (
    <div className="pokemon-list-wrapper">
  
     <div className="pokemon-wrapper">
        {(isLoading)?"loading.." : 
       pokemonList.map((p)=> <Pokemon image={p.image} name={p.name} key={p.id} />)}
       </div>
       <div className="controls">
            <button disabled={prevUrl === null} onClick={()=>setPokedexUrl(prevUrl)}>prev</button>
            <button disabled={nextUrl === null} onClick={()=>setPokedexUrl(nextUrl)}>next</button>
        </div>
    </div>
  )
}

export default PokemonList
