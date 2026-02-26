import React from "react";
import FaceExpression from "./features/Expression/components/FaceExpression";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FaceExpression />
    </div>
  );
};

export default App;
