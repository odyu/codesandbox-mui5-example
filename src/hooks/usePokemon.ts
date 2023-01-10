import PokeAPI, {
  INamedApiResource,
  INamedApiResourceList,
  IPokemon,
} from "pokeapi-typescript";
import { useEffect, useState } from "react";

export const usePokemon = (): IPokemon | undefined => {
  const [pokemon, setPokemon] = useState<IPokemon>();

  useEffect(() => {
    PokeAPI.Pokemon.fetch(25).then((newPokemon) => setPokemon(newPokemon));
  }, []);

  return pokemon;
};
