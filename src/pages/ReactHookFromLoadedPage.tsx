import { FC } from "react";

import { PokemonForm } from "../components/ReactHookFrom/PokemonForm";
import { usePokemons } from "../hooks/usePokemons";

export const ReactHookFromLoadedPage: FC = () => {
  const { pokemons, loading } = usePokemons();

  return <PokemonForm loading={loading} values={{ pokemons }} />;
};
