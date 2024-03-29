import Button from "@mui/material/Button";
import { FC } from "react";

import { AppLayout } from "../layouts/AppLayout";

export const TopPage: FC = () => (
  <AppLayout>
    <Button fullWidth={true} href="/react-hook-form/empty">
      ReactHookForm Empty Page
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded/50">
      ReactHookForm Loaded Page (50)
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded/100">
      ReactHookForm Loaded Page (100)
    </Button>

    <Button fullWidth={true} href="/react-hook-form/loaded/150">
      ReactHookFrom Loaded Page (150)
    </Button>

    <Button fullWidth={true} href="/formik/empty">
      Formik Empty Page
    </Button>

    <Button fullWidth={true} href="/formik/loaded/50">
      Formik Loaded Page (50)
    </Button>

    <Button fullWidth={true} href="/formik/loaded/100">
      Formik Loaded Page (100)
    </Button>

    <Button fullWidth={true} href="/formik/loaded/150">
      Formik Loaded Page (150)
    </Button>
  </AppLayout>
);
