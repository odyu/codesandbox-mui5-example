import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { FC, PropsWithChildren, ReactNode } from "react";

export const AppLayout: FC<PropsWithChildren<{ header?: ReactNode }>> = ({ children, header }) => (
  <>
    <AppBar color="inherit" component="nav" position="sticky">
      <Toolbar sx={{ gridGap: 16 }}>
        <Button color="inherit" href="/">
          Top
        </Button>
        <Box sx={{ flexGrow: 1 }}>{header}</Box>
      </Toolbar>
    </AppBar>

    <Box component="main" sx={{ p: 3, width: "100%" }}>
      {children}
    </Box>
  </>
);
