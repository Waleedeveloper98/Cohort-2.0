import { createBrowserRouter } from "react-router-dom";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import Home from "./features/home/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
