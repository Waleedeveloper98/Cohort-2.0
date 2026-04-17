import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/product/pages/CreateProduct";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/product/pages/Dashboard";
import Layout from "./Layout";
import Home from "../features/product/pages/Home";
import ProductDetails from "../features/product/components/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/seller",
        children: [
          {
            path: "create",
            element: (
              <Protected role="seller">
                <CreateProduct />
              </Protected>
            ),
          },
          {
            path: "dashboard",
            element: (
              <Protected role="seller">
                <Dashboard />
              </Protected>
            ),
          },
        ],
      },
    ],
  },
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
]);

export default router;
