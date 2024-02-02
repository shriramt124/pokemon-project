import { useEffect ,useState} from "react"
 import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css'
function PokemonList() {
 
    //  const [pokemonList,setpokemonList] = useState([])
    //    const [isLoading,setIsLoading] = useState(true);
    //   const [pokedexUrl,setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    //     const[nextUrl,setNexturl] = useState("")
    //     const [prevUrl,setPrevUrl] = useState("");

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
 