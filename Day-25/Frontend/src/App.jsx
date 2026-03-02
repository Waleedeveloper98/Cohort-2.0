import React from "react";
import FaceExpression from "./features/Expression/components/FaceExpression";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoutes";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <FaceExpression /> */}
    </div>
  );
};

export default App;
