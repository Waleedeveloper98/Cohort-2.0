import React, { useState } from "react";
import "../style/auth.scss";
import Logo from "../../shared/components/ui/logo/Logo";
import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthHero from "../components/AuthHero";
import useAuth from "../hooks/useAuth";
import Loader from "../../shared/components/ui/loader/Loader";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(username, email, password);
      setUsername("");
      setEmail("");
      setPassword("");
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="username">Username</label>
              <div className="inner">
                <User stroke="#334155" size={18} className="icon" />
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Your unique handle"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit">
              {loading ? (
                <Loader />
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
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
