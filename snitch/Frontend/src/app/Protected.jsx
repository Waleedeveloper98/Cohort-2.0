import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user || user.role !== "seller") {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};

export default Protected;
