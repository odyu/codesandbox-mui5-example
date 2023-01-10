import React, { FC } from "react";
import { Route,Routes } from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout";
import { FormikPage } from "./pages/FormikPage";
import { ReactHookForm2Page } from "./pages/ReactHookForm2Page";
import { ReactHookFormPage } from "./pages/ReactHookFormPage";
import { TopPage } from "./pages/TopPage";

export const App: FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route element={<TopPage />} path="/" />
      <Route element={<FormikPage />} path="/formik" />
      <Route element={<ReactHookFormPage />} path="/react-hook-form" />
      <Route element={<ReactHookForm2Page />} path="/react-hook-form-2" />
    </Route>
  </Routes>
);
