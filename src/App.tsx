import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { TopPage } from "./pages/TopPage";
import { FormikPage } from "./pages/FormikPage";
import { ReactHookFormPage } from "./pages/ReactHookFormPage";
import { ReactHookForm2Page } from "./pages/ReactHookForm2Page";
import React, { FC } from "react";

export const App: FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<TopPage />} />
      <Route path="/formik" element={<FormikPage />} />
      <Route path="/react-hook-form" element={<ReactHookFormPage />} />
      <Route path="/react-hook-form-2" element={<ReactHookForm2Page />} />
    </Route>
  </Routes>
);
