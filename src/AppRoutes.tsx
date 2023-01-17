import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout";
import { FormikEmptyPage } from "./pages/FormikEmptyPage";
import { ReactHookFromEmptyPage } from "./pages/ReactHookFromEmptyPage";
import { ReactHookFromLoadedPage } from "./pages/ReactHookFromLoadedPage";
import { TopPage } from "./pages/TopPage";

export const AppRoutes: FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route element={<TopPage />} path="/" />
      <Route element={<FormikEmptyPage />} path="/formik/empty" />
      <Route element={<ReactHookFromEmptyPage />} path="/react-hook-form/empty" />
      <Route element={<ReactHookFromLoadedPage />} path="/react-hook-form/loaded" />
    </Route>
  </Routes>
);
