import PokeAPI, { IPokemon, INamedApiResourceList } from "pokeapi-typescript";
import { useEffect, useState } from "react";

type UsePokemonsProps = {
  count?: number;
};

export const usePokemons = ({ count = 10 }: UsePokemonsProps) => {
  const [pokemons, setPokemons] = useState<
    INamedApiResourceList<IPokemon> | undefined
  >();

  useEffect(() => {
    PokeAPI.Pokemon.list(count, 0).then((newPokemons) =>
      setPokemons(newPokemons)
    );
  }, []);

  return pokemons?.results;
};
