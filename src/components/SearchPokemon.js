import React from "react";
import { PokemonTable } from "./PokemonTable";

const fetchPokemon = async (setPokemon, setError) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );
    const result = await response.json();
    setPokemon(result.pokemon);
  } catch (e) {
    setError(e);
  }
};
export const SearchPokemon = () => {
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchPokemon(setPokemon, setError);
  }, []);

  if (error) {
    return <p>Error loading pokemon: {error}</p>;
  }

  if (!error && pokemon === null) {
    return <p>Loading...</p>;
  }
  return <PokemonTable pokemon={pokemon} />;
};
