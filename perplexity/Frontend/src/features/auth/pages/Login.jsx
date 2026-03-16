import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { user, loading } = useSelector((state) => state.auth);

  if(!loading && user){
    return <Navigate to={"/"} replace/>
  }

  const submitForm = async (e) => {
    e.preventDefault();
    // Add authentication logic here
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">
        <h2 className="text-3xl font-bold mb-8 text-center text-zinc-100">
          Welcome Back
        </h2>
        <form onSubmit={submitForm} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-[#4F8AA3] focus:ring-1 focus:ring-[#4F8AA3] transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <div className=" mb-2">
              <label
                className="block text-sm font-medium text-zinc-300"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-[#4F8AA3] focus:ring-1 focus:ring-[#4F8AA3] transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer py-3 px-4 mt-4 rounded-lg font-semibold text-white shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 hover:brightness-110 active:scale-95"
            style={{ backgroundColor: "#4F8AA3" }}
          >
            Log In
          </button>
        </form>
        <p className="mt-8 text-center text-zinc-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#4F8AA3] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
