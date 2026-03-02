import React, { useState } from "react";
import "../style/auth.scss";
import Logo from "../../shared/components/ui/logo/Logo";
import { ArrowRight, LockKeyhole, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthHero from "../components/AuthHero";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../../shared/components/ui/loader/Loader";
import Confetti from "react-confetti-boom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(username, password);
      toast.success("user logged In successfully");
      setUsername("");
      setPassword("");
      setShowConfetti(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (showConfetti) {
    return (
      <Confetti
        mode="boom"
        particleCount={100}
        spreadDeg={60}
        colors={["#7c3aed", "#06b6d4", "#10b981", "#f8fafc"]}
      />
    );
  }

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
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <div className="inner">
                <User stroke="#334155" size={18} className="icon" />
                <input
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  type="text"
                  placeholder="username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  Log In to Moodify <ArrowRight size={18} />
                </>
              )}
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
