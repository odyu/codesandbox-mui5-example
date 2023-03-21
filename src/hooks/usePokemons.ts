import { useCallback, useEffect, useState } from "react";

import { Pokemon, pokemonData200 } from "../models/Pokemon";
import { sleep } from "../utils/sleep";

export const usePokemons = (limit: number = 200): { pokemons: Pokemon[]; loading: boolean } => {
  const [loading, setLoading] = useState(false);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const load = useCallback(() => {
    setLoading(true);
    sleep(1000).then(() => {
      setPokemons(pokemonData200.slice(0, limit));
      setLoading(false);
    });
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, pokemons };
};
