import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/product/pages/CreateProduct";
import Home from "./Home";
import Protected from "./Protected";
import ViewProducts from "../features/product/pages/ViewProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: (
      <Protected>
        <CreateProduct />
      </Protected>
    ),
  },
  {
    path: "/seller/products",
    element: <ViewProducts />,
  },
]);

export default router;
