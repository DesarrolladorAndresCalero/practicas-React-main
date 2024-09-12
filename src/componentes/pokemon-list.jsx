import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "../servicios/pokeService";

function PokemonList(){
    const [pokemonData, setPokemonData] = useState([]);
    const apiURL = 'https://pokeapi.co/api/v2/pokemon';

    useEffect ( () => {
        async function fetchData() {
            let response = await getAllPokemon(apiURL);
            console.log(response);
            await loadPokemon(response.results)
            console.log(pokemonData);
        }
        fetchData();
    }, [] )

    const loadPokemon = async (data) => {
        let _pokemonData =  await Promise.all( data.map( async pokemon => {
            let pokemonGet = await getPokemon(pokemon)
            return pokemonGet;
        } ) )
        setPokemonData(_pokemonData);
    }


    return(
        <div>
            <h1>Poke List</h1>
            <ul>
            {pokemonData.map( pokemon => {
                <li>
                    {pokemon.name}
                    <img src={pokemon.sprites.front_default}></img>
                </li>
            })}
            </ul>
        </div>
    )

}



export default PokemonList;