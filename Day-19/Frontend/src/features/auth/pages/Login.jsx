import React from "react";
import "../../style/form.scss";
import { Link } from "react-router";
import loginImage from "../../../assets/login.png";

const Login = () => {
  return (
    <section>
      <div className="inner-section">
        <div className="form-section">
          <div className="form-content">
            <div className="headings">
              <h3>Login</h3>
              <p>Log in to see what you missed.</p>
            </div>
            <form>
              <div className="input-box">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  name="password"
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
