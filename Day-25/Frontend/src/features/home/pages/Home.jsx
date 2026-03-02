import React from "react";
import useAuth from "../../auth/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <h1 className="home">username: {user.username}</h1>
      <h1 className="home">email: {user.email}</h1>
    </>
  );
};

export default Home;
