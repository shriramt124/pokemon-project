 
import useDebounce from '../../hooks/useDebounce'
import './Search.css'
function Search({updateSearchTerm}) {
 const debouceCallback = useDebounce((e)=>updateSearchTerm(e.target.value));


  return (
    <div className="search-wrapper">
        <input type="text" placeholder="pokemon name ..." 
         id="pokemon-name-search"
         onChange={debouceCallback}
         /> 
          
    </div>
    
  )
 
}

export default Search