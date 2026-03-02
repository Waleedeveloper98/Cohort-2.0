import { createBrowserRouter } from "react-router-dom";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>This is home page</h1>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
