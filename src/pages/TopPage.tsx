import Button from "@mui/material/Button";
import { FC } from "react";

import { AppLayout } from "../layouts/AppLayout";

export const TopPage: FC = () => (
  <AppLayout>
    <Button fullWidth={true} href="/react-hook-form/empty">
      ReactHookFrom EmptyPage
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded">
      ReactHookFrom LoadedPage
    </Button>

    <Button fullWidth={true} href="/formik/empty">
      Formik EmptyPage
    </Button>
  </AppLayout>
);
