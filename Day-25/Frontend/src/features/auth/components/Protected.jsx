import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();
  if (loading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <div>{children}</div>;
};

export default Protected;
