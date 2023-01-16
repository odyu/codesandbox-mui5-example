import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { FC } from "react";
import { useOutlet } from "react-router-dom";

export const AppLayout: FC = () => {
  const outlet = useOutlet();

  return (
    <Box sx={{ display: "flex", width: "100vw" }}>
      <AppBar component="nav">
        <Toolbar sx={{ gridGap: "4px" }}>
          <Button color="inherit" fullWidth={true} href="/">
            Top
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        {outlet}
      </Box>
    </Box>
  );
};
