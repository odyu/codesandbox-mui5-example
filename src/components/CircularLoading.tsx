import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

export const CircularLoading: FC = () => (
  <Stack alignItems="center" height={200} justifyContent="center" width="100%">
    <CircularProgress />
    <Typography display="block" gutterBottom variant="overline">
      読込中...
    </Typography>
  </Stack>
);
