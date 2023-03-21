import { Box } from "@mui/material";
import React, { FC } from "react";

import { CircularLoading } from "../components/CircularLoading";
import { PokemonFormPage } from "../components/ReactHookFrom/PokemonFormPage";
import { usePokemons } from "../hooks/usePokemons";
import { AppLayout } from "../layouts/AppLayout";

export const ReactHookFromLoadedPage: FC = () => {
  const { pokemons, loading } = usePokemons();

  if (loading) {
    return (
      <AppLayout>
        <Box sx={{ width: "100%" }}>
          <CircularLoading />
        </Box>
      </AppLayout>
    );
  }

  return <PokemonFormPage values={{ pokemons }} />;
};
