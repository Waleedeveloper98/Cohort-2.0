import React from "react";
import { Eye } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hook/useProduct";

const ProductCard = ({ product }) => {
  const { title, price } = product;
  const { id } = useParams();

  return (
    <div className="group relative flex w-full max-w-75 flex-col overflow-hidden rounded-lg bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      {/* Image Container */}
      <div className="relative max-h-48 overflow-hidden bg-gray-100">
        <img
          src={product.images[0].url || "/api/placeholder/400/500"}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col px-4 py-2 pb-6">
        <h3 className="text-lg font-medium tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-black">
          {title}
        </h3>

        <div className="mt-4 flex items-center justify-between border-t pt-4 border-slate-200">
          <p className="text-xl font-light text-slate-900">
            {price.currency} {price.amount.toLocaleString()}
          </p>

          {/* Action Button */}
          <Link
            to={`/products/${product._id}`}
            className="relative cursor-pointer flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-black active:scale-95"
          >
            <span className="relative z-10">View Details</span>
            <Eye size={14} className="relative z-10" />
          </Link>
        </div>
      </div>

      {/* Decorative Bottom Border Animation */}
      <div className="absolute bottom-0 h-0.5 w-0 bg-slate-900 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default ProductCard;
