import { Box } from "@mui/material";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { CircularLoading } from "../components/CircularLoading";
import { PokemonForm } from "../components/ReactHookFrom/PokemonForm";
import { usePokemons } from "../hooks/usePokemons";
import { AppLayout } from "../layouts/AppLayout";

export const ReactHookFromLoadedPage: FC = () => {
  const { limit } = useParams();
  const { pokemons, loading } = usePokemons(Number(limit) || 200);

  if (loading) {
    return (
      <AppLayout>
        <Box sx={{ width: "100%" }}>
          <CircularLoading />
        </Box>
      </AppLayout>
    );
  }

  return <PokemonForm values={{ pokemons }} />;
};
