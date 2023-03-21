import { useCallback, useEffect, useState } from "react";

import { Pokemon, pokemonData } from "../models/Pokemon";
import { sleep } from "../utils/sleep";

export const usePokemons = (): { pokemons: Pokemon[]; loading: boolean } => {
  const [loading, setLoading] = useState(false);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const load = useCallback(() => {
    setLoading(true);
    sleep(1000).then(() => {
      setPokemons(pokemonData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, pokemons };
};
