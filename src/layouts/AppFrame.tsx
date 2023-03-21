import Box from "@mui/material/Box";
import { FC } from "react";
import { useOutlet } from "react-router-dom";

export const AppFrame: FC = () => {
  const outlet = useOutlet();

  return <Box sx={{ width: "100vw" }}>{outlet}</Box>;
};
