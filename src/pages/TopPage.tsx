import Button from "@mui/material/Button";
import { FC } from "react";

export const TopPage: FC = () => (
  <div>
    <Button fullWidth={true} href="/react-hook-form/empty">
      ReactHookFrom EmptyPage
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded">
      ReactHookFrom LoadedPage
    </Button>

    <Button fullWidth={true} href="/formik/empty">
      Formik EmptyPage
    </Button>
  </div>
);
