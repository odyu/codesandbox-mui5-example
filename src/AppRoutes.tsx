import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { AppFrame } from "./layouts/AppFrame";
import { FormikEmptyPage } from "./pages/FormikEmptyPage";
import { FormikLoadedPage } from "./pages/FormikLoadedPage";
import { ReactHookFormEmptyPage } from "./pages/ReactHookFormEmptyPage";
import { ReactHookFormLoadedPage } from "./pages/ReactHookFormLoadedPage";
import { TopPage } from "./pages/TopPage";

export const AppRoutes: FC = () => (
  <Routes>
    <Route element={<AppFrame />}>
      <Route element={<TopPage />} path="/" />
      <Route element={<FormikEmptyPage />} path="/formik/empty" />
      <Route element={<FormikLoadedPage />} path="/formik/loaded/:limit" />
      <Route element={<ReactHookFormEmptyPage />} path="/react-hook-form/empty" />
      <Route element={<ReactHookFormLoadedPage />} path="/react-hook-form/loaded/:limit" />
    </Route>
  </Routes>
);
