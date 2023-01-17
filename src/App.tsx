import React, { FC } from "react";

import { AppRoutes } from "./AppRoutes";
import { SnackbarProvider } from "./providers/SnackbarProvider";

export const App: FC = () => (
  <SnackbarProvider>
    <AppRoutes />
  </SnackbarProvider>
);
