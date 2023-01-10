import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import Button from "@mui/material/Button";

export const TopPage: FC<RouteComponentProps<{}>> = () => (
  <div>
    <Button href="/react-hook-form">ReactHookForm</Button>
    <Button href="/formik">Formik</Button>
  </div>
);
