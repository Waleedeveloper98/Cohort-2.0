import React from "react";
import { createBrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <h1>Welcome to my app</h1>,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
]);
