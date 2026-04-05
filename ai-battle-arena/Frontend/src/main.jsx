import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import ArenaProvider from "./features/arena/ArenaContext.jsx";

createRoot(document.getElementById("root")).render(
  <ArenaProvider>
    <App />
  </ArenaProvider>,
);
