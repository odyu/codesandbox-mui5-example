import { useCallback, useEffect, useState } from "react";

import { Pokemon, pokemonData } from "../models/Pokemon";
import { sleep } from "../utils/sleep";

export const usePokemons = (): { pokemons: Pokemon[]; loading: boolean } => {
  const [loading, setLoading] = useState(false);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    await sleep(1000);
    setPokemons(pokemonData);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, pokemons };
};
