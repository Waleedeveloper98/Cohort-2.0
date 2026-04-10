import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome to the app</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
