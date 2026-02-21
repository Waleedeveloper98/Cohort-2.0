import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoutes";
import "../src/features/shared/global.scss";

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
};

export default App;
