import React from "react";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleSubmitLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <>
      <h1 className="home">username: {user?.username}</h1>
      <h1 className="home">email: {user?.email}</h1>

      <button
        onClick={handleSubmitLogout}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Home;
