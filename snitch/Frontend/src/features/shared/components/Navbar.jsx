import React from "react";
import { useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  // Compute real count based on total items (or total quantities)
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems ? cartItems.length : 0;

  return (
    <nav className="sticky top-0 z-100 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex-1">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 tracking-wide hover:opacity-80 transition-opacity"
          >
            Snitch
          </Link>
        </div>
        <div className="flex-1 flex justify-end items-center gap-6">
          {user ? (
            <span className="text-lg font-medium text-gray-600">
              {user.fullName}
            </span>
          ) : (
            <span className="text-lg font-medium text-gray-400">Guest</span>
          )}

          {user && (
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-slate-900 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
