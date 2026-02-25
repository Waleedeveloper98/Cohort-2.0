import React, { useState } from "react";
import "../../auth/style/form.scss";
import { Link, useNavigate } from "react-router";
import loginImage from "../../../assets/login.png";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { handleLogin, loading } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(username, password)
      .then((res) => {
        navigate("/feed");
      })
      .catch((err) => console.log(err));
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
                  autoComplete="off"
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
              <button className="button" type="submit">
                {loading ? <Loader /> : "Login"}
              </button>
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
