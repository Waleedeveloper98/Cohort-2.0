import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((u) => setUsers(u.data));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      {users.map((u) => {
        return <li key={u.id}>{u.name}</li>;
      })}
    </div>
  );
};

export default App;
