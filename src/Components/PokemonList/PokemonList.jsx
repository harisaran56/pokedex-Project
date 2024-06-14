
import { useEffect, useState } from "react";
import axios from 'axios' ;
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){



    const [PokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const [pokedexUrl,setPokedexUrl] =  useState(' https://pokeapi.co/api/v2/pokemon ');


    const [nextUrl,setNextUrl] = useState('');
    const [prevUrl,setPrevUrl] = useState('');


   async function downloadPokemons() {
    setIsLoading(true);
    // this download the list of 20 pokemons
        const response = await axios.get(pokedexUrl);

        // we get the array of pokemon from result
        const pokemonResults = response.data.results;

        // iterating over the array of pokemon,and using their url, to create an array of promise

        // this will download those 20 pokemons
        // console.log(pokemonResults);
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));


        // passing that promise array to axios.all


        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // now iterating on the data of each pokemmon and extract id,name,image,types
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                types:pokemon.types
            }
        });
        console.log(res);

        setPokemonList(res);


        setIsLoading(false);

    }




    useEffect(()=> {
        downloadPokemons();
       
       
    },[pokedexUrl]);

    
    return(
        
        <div className = "Pokemon-list-wrapper">
          

            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading....': 
                  PokemonList.map((p) => <Pokemon name={p.name} image = {p.image} key = {p.id}/>)
                }
              
            </div>
            <div className="Controls">
                <button disabled ={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled ={nextUrl == null}onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
           

            
           
        
        
        
       
        
    )


}
export default PokemonList;