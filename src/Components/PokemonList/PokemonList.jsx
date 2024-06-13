
import { useEffect, useState } from "react";
import axios from 'axios' ;
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){



    const [PokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const POKEDEX_URL = ' https://pokeapi.co/api/v2/pokemon';


   async function downloadPokemons(){
    // this download the list of 20 pokemons
        const response = await axios.get(POKEDEX_URL);

        // we get the array of pokemon from result
        const pokemonResults = response.data.results;

        // iterating over the array of pokemon,and using their url, to create an array of promise

        // this will download those 20 pokemons
        console.log(pokemonResults);
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));


        // passing that promise array to axios.all


        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(response.data);

        // now iterating on the data of each pokemmon and extract id,name,image,types
        const res = pokemonData.map((pokeData) =>{
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image: (pokemon.sprites.others) ? pokemon.sprites.other.dream_world.front_default_:pokemon.sprites.front_shiny,
                types:pokemon.types}
        });
        console.log(res);
        setPokemonList(res);

        setIsLoading(false);

    }




    useEffect(()=> {
        downloadPokemons();
       
       
    },[]);

    
    return(
        
        <div className = "Pokemon-list-wrapper">
            <div>Pokemon List</div>
            {(isLoading) ? 'Loading....': 
            PokemonList.map((p) => <Pokemon name={p.name} image = {p.image} key = {p.id}/>)
            
            } 
        </div>
        
        
        
       
        
    )


}
export default PokemonList;