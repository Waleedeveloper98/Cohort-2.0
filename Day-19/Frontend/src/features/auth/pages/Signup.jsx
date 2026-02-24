import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../../auth/style/form.scss";
import signupImage from "../../../assets/signup.png";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { handleRegister, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, email, password).then((res) => {
      
      navigate("/login");
    });
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
              <button type="submit">
                {loading ? <Loader /> : "Create account"}
              </button>
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
