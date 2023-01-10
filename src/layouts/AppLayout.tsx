import { FC } from "react";
import { useOutlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

export const AppLayout: FC = () => {
  const outlet = useOutlet();

  return (
    <Box sx={{ display: "flex", width: "100vw" }}>
      <AppBar component="nav">
        <Toolbar sx={{ gridGap: "4px" }}>
          <Button color="inherit" href="/">
            Top
          </Button>
          <Button color="inherit" href="/react-hook-form">
            ReactHookForm
          </Button>
          <Button color="inherit" href="/formik">
            Formik
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
