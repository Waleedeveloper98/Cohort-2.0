import React from "react";
import "../style/auth.scss";
import Logo from "../../shared/components/logo/Logo";
import AuthHero from "../../shared/components/authHero/AuthHero";
import { ArrowRight, LockKeyhole, User } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section>
      <div className="left">
        <Logo />
        <AuthHero
          titleText="Welcome Back"
          descText="Let AI tune into your emotions again. Experience music that feels exactly like you do."
        />
      </div>
      <div className="right">
        <div className="form-container">
          <div className="top">
            <h2>Log In</h2>
            <p>Enter your details to access your vibes.</p>
          </div>
          <form>
            <div className="input-box">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <div className="inner">
                <User stroke="#334155" size={18} className="icon" />
                <input
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  type="text"
                  placeholder="username or email"
                />
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <div className="inner">
                <LockKeyhole stroke="#334155" size={18} className="icon" />
                <input
                  className="password-dots"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="......."
                />
              </div>
            </div>
            <button type="submit">
              Log In to Moodify <ArrowRight size={18} />
            </button>
          </form>
          <p className="bottom">
            Don't have an account? <Link to={"/signup"}>Sign up free</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
