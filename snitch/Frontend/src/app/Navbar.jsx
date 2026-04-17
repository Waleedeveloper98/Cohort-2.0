import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="sticky top-0 z-100 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex-1">
          <span className="text-2xl font-bold text-gray-800 tracking-wide">
            Snitch
          </span>
        </div>
        <div className="flex-1 text-right">
          {user ? (
            <span className="text-lg font-medium text-gray-600">
              {user.fullName}
            </span>
          ) : (
            <span className="text-lg font-medium text-gray-400">Guest</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
