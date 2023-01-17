import { LinkProps as MuiLinkProps } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { LinkBehavior } from "./components/LinkBehavior";

export const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as MuiLinkProps,
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
      },
    },
  },
});
