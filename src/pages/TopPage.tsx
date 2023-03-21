import Button from "@mui/material/Button";
import { FC } from "react";

import { AppLayout } from "../layouts/AppLayout";

export const TopPage: FC = () => (
  <AppLayout>
    <Button fullWidth={true} href="/react-hook-form/empty">
      ReactHookFrom Empty Page
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded/50">
      ReactHookFrom Loaded Page (50)
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded/100">
      ReactHookFrom Loaded Page (100)
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded/200">
      ReactHookFrom Loaded Page (200)
    </Button>

    <Button fullWidth={true} href="/formik/empty">
      Formik EmptyPage
    </Button>
  </AppLayout>
);
