import React, { useState } from "react";
import "../style/auth.scss";
import Logo from "../../shared/components/ui/logo/Logo";
import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthHero from "../components/AuthHero";
import useAuth from "../hooks/useAuth";
import Loader from "../../shared/components/ui/loader/Loader";
import toast from "react-hot-toast";
import FormGroup from "../components/FormGroup";

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
            <FormGroup
              label={"username"}
              placeholder={"Your unique handle"}
              type={"text"}
              icon={User}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormGroup
              label={"email"}
              placeholder={"name@example.com"}
              type={"email"}
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormGroup
              label={"password"}
              placeholder={"......."}
              type={"password"}
              icon={LockKeyhole}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
