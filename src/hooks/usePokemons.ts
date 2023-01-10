import PokeAPI, {
  INamedApiResource,
  INamedApiResourceList,
  IPokemon,
} from "pokeapi-typescript";
import { useEffect, useState } from "react";

type UsePokemonsProps = {
  count?: number;
};

export type Pokemons = Array<INamedApiResource<IPokemon>>;
export const usePokemons = ({ count = 10 }: UsePokemonsProps): Pokemons => {
  const [pokemons, setPokemons] = useState<
    INamedApiResourceList<IPokemon> | undefined
  >();

  useEffect(() => {
    PokeAPI.Pokemon.list(count, 0).then((newPokemons) =>
      setPokemons(newPokemons)
    );
  }, [count]);

  return pokemons?.results || [];
};
