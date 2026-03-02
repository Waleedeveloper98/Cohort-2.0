import React from "react";
import "../style/auth.scss";
import Logo from "../../shared/components/ui/logo/Logo";
import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthHero from "../components/AuthHero";

const Signup = () => {
  return (
    <section>
      <div className="left">
        <Logo />
        <AuthHero
          tagText="ai face detection active"
          titleText="Feel. Detect. Play."
          descText="Experience the future of sound guided by your mood. Our AI interprets your
      expressions to curate the perfect soundtrack for every moment."
        />
      </div>
      <div className="right">
        <div className="form-container">
          <div className="top">
            <h2>Create Account</h2>
            <p>Join Moodify and let your emotions lead.</p>
          </div>
          <form>
            <div className="input-box">
              <label htmlFor="username">Username</label>
              <div className="inner">
                <User stroke="#334155" size={18} className="icon" />
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Your unique handle"
                />
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="email">Email Address</label>
              <div className="inner">
                <Mail size={18} className="icon" />
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
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
              Create Account <ArrowRight size={18} />
            </button>
          </form>
          <p className="bottom">
            Already have an account? <Link to={"/login"}>Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
