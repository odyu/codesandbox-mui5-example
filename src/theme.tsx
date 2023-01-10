import { LinkBehavior } from "./components/LinkBehavior";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
        fullWidth: true
      }
    }
  }
});
