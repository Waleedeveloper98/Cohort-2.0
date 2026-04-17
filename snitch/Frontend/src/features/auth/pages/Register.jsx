import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const { handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      fullName: formData.fullName,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
      isSeller: formData.isSeller,
    });
      navigate("/login");
  };

  const inputFields = [
    {
      id: "fullName",
      label: "FULL NAME",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: "email",
      label: "EMAIL ADDRESS",
      type: "email",
      placeholder: "john@example.com",
    },
    {
      id: "contact",
      label: "CONTACT NUMBER",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
    },
  ];

  const imageUrl =
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="min-h-screen max-h-screen flex flex-col lg:flex-row font-sans">
      {/* ── Left panel ── */}
      <div className="relative hidden md:block lg:w-2/5 h-64 sm:h-80 lg:h-auto overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <header className="px-8 pt-6 pb-2 flex-shrink-0 absolute">
          <div className="flex items-center gap-2">
            <span className="text-[#1a1a2e] font-bold text-xl tracking-tight select-none">
              Vogue Noir
            </span>
            <span className="text-xl">👕</span>
          </div>
        </header>

        {/* Caption card */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-sm px-5 py-3 shadow-lg">
          <p className="text-[#b85c1e] font-bold text-base tracking-wide leading-tight">
            Curated Style.
          </p>
          <p className="text-gray-500 text-xs tracking-[0.18em] uppercase mt-0.5">
            Edition 2026
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div
        className="flex-1 flex flex-col h-screen overflow-y-auto lg:overflow-hidden"
        style={{ background: "#f8f5f0" }}
      >
        {/* Form container */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 sm:px-12 lg:px-16 py-4 overflow-y-auto lg:overflow-visible">
          <div className=" w-full mx-auto lg:mx-0 max-w-md">
            {/* Heading */}
            <h1 className="text-[#1a1a2e] font-bold text-2xl sm:text-3xl leading-tight tracking-tight mb-1">
              Create your account
            </h1>
            <p className="text-gray-500 text-xs mb-4">
              Join the Vogue Noir fashion community
            </p>

            {/* Text fields */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {inputFields.map(({ id, label, type, placeholder }) => (
                <div key={id} className="group">
                  <label
                    htmlFor={id}
                    className={`block text-[9px] font-semibold tracking-[0.16em] mb-1 transition-colors duration-200 ${
                      focusedField === id ? "text-[#b85c1e]" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={placeholder}
                      onFocus={() => setFocusedField(id)}
                      onBlur={() => setFocusedField(null)}
                      value={formData[id]}
                      onChange={handleChange}
                      className={`w-full bg-white border rounded-md px-4 py-2 text-sm text-gray-700 placeholder-gray-300 outline-none transition-all duration-200
                        ${
                          focusedField === id
                            ? "border-[#b85c1e] shadow-[0_0_0_3px_rgba(184,92,30,0.12)]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                    />
                  </div>
                </div>
              ))}

              {/* Password field */}
              <div className="group">
                <label
                  htmlFor="password"
                  className={`block text-[9px] font-semibold tracking-[0.16em] mb-1 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-[#b85c1e]"
                      : "text-gray-400"
                  }`}
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-white border rounded-md px-4 py-2 pr-11 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200
                      ${
                        focusedField === "password"
                          ? "border-[#b85c1e] shadow-[0_0_0_3px_rgba(184,92,30,0.12)]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                  />
                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setPasswordVisible((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#b85c1e] transition-colors duration-200 focus:outline-none cursor-pointer"
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Seller checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group select-none mt-1">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={formData.isSeller}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isSeller: !prev.isSeller,
                    }))
                  }
                  className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
                    ${
                      formData.isSeller
                        ? "bg-[#b85c1e] border-[#b85c1e] scale-105"
                        : "bg-white border-gray-300 group-hover:border-[#b85c1e]"
                    }`}
                >
                  <Check
                    className={`w-3 h-3 text-white transition-all duration-150 ${
                      formData.isSeller
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-150">
                  I want to register as a seller
                </span>
              </label>
              {/* Sign Up button */}
              <button
                type="submit"
                className="mt-4 w-full bg-[#b85c1e] text-white font-semibold text-sm tracking-wide py-2.5 rounded-md cursor-pointer
                transition-all duration-200 ease-out
                hover:bg-[#a04e18] hover:shadow-lg hover:shadow-[#b85c1e]/30 hover:-translate-y-0.5
                active:scale-[0.98] active:shadow-none active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-[#b85c1e]/50"
              >
                Sign Up
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[9px] font-semibold tracking-[0.18em] text-gray-400 whitespace-nowrap">
                OR CONTINUE WITH GOOGLE
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google button */}
            <a
              href="/api/auth/google"
              className="w-full bg-white border border-gray-200 text-gray-700 font-medium text-sm py-2.5 rounded-md flex items-center justify-center gap-3 cursor-pointer
                transition-all duration-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5
                active:scale-[0.98] active:shadow-none active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {/* Google G */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5 flex-shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.1-6.1C34.46 2.96 29.47 1 24 1 14.82 1 7.01 6.48 3.72 14.18l7.14 5.54C12.5 13.33 17.8 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.68c-.55 2.94-2.2 5.43-4.68 7.1l7.2 5.6C43.3 37.8 46.5 31.6 46.5 24.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.86 28.28A14.5 14.5 0 019.5 24c0-1.5.26-2.94.7-4.28L3.06 14.18A23.15 23.15 0 001 24c0 3.72.9 7.23 2.48 10.32l7.38-6.04z"
                />
                <path
                  fill="#34A853"
                  d="M24 47c5.97 0 10.97-1.97 14.62-5.35l-7.2-5.6C29.5 37.7 26.9 38.5 24 38.5c-6.2 0-11.5-3.82-13.14-9.22l-7.38 6.04C6.78 42.85 14.82 47 24 47z"
                />
              </svg>
              Google
            </a>

            {/* Login link */}
            <p className="text-center text-xs text-gray-500 mt-4">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                href="#"
                className="text-[#b85c1e] font-medium hover:underline hover:text-[#a04e18] transition-colors duration-150"
              >
                Log in
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
