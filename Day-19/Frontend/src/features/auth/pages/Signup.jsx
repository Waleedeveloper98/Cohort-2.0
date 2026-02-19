import React from "react";
import { Link } from "react-router";
import "../../style/form.scss";
import signupImage from "../../../assets/signup.png";

const Signup = () => {
  return (
    <section>
      <div className="inner-section">
        <div className="form-section">
          <div className="form-content">
            <div className="headings">
              <h3>Sign up</h3>
              <p>Show the world how you see it.</p>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
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
