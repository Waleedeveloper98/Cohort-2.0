import React, { useState } from "react";
import { Link } from "react-router";
import "../../style/form.scss";
import signupImage from "../../../assets/signup.png";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
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
              <h3>Sign up</h3>
              <p>Show the world how you see it.</p>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit">Create account</button>
            </form>
            <p className="cta">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
        <div className="form-bg-section">
          <img src={signupImage} alt="sign up" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
