import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./features/auth/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { SongContextProvider } from "./features/home/SongContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SongContextProvider>
      <App />
      <Toaster />
    </SongContextProvider>
  </AuthProvider>,
);
