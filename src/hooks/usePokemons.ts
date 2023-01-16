import { useCallback, useEffect, useState } from "react";

import { Pokemon, pokemonData } from "../models/Pokemon";
import { sleep } from "../utils/sleep";

export const usePokemons = (): Pokemon[] => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const load = useCallback(async () => {
    await sleep(1000);
    setPokemons(pokemonData);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return pokemons;
};
