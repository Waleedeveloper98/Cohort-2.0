import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/product/pages/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome to the app</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller/create",
    element: <CreateProduct />,
  },
]);

export default router;
