import React from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { initializeSocketConnection } = useChat();
  console.log(user);

  useEffect(() => {
    initializeSocketConnection();
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
