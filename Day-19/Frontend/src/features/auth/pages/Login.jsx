import React, { useState } from "react";
import "../../style/form.scss";
import { Link } from "react-router";
import loginImage from "../../../assets/login.png";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };
  return (
    <section>
      <div className="inner-section">
        <div className="form-section">
          <div className="form-content">
            <div className="headings">
              <h3>Login</h3>
              <p>Log in to see what you missed.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <p className="cta">
              Create an account? <Link to={"/signup"}>Sign up</Link>
            </p>
          </div>
        </div>
        <div className="form-bg-section">
          <img src={loginImage} alt="login" />
        </div>
      </div>
    </section>
  );
};

export default Login;
