import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./features/auth/Auth.context.jsx";
import PostProvider from "./features/posts/Post.context.jsx";
import { UserContextProvider } from "./features/users/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserContextProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </UserContextProvider>
  </AuthProvider>,
);
