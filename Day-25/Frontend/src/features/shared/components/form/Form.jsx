import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import "../form/form.scss";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="form-container">
      <div>
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
  );
};

export default Form;
