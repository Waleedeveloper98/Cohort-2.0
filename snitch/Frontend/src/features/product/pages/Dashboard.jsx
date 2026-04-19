import React, { useEffect } from "react";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";

const Dashboard = () => {
  const navigate = useNavigate();
  const { sellerProducts } = useSelector((state) => state.product);
  const { handleGetSellerProducts } = useProduct();

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans pb-12">
      <main className="pt-12 px-8 max-w-7xl mx-auto">
        {/* Page Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1a1c1c] hover:bg-[#eeeeee] transition-colors shadow-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1c1c]">
              My Products
            </h2>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-[#e8e8e8] text-[#414753] text-xs font-semibold uppercase tracking-widest rounded-full">
              Total: {sellerProducts?.length} Items
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sellerProducts?.map((product) => (
            <article
              key={product._id}
              className="group bg-white rounded-xl p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(26,28,28,0.06)] relative overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 cursor-zoom-in group/img">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-110"
                  src={product?.images[0]?.url}
                />
                {/* Card Hover Overlay Icons */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-3 gap-2">
                  <button
                    onClick={() => navigate(`/seller/variants/${product._id}`)}
                    className="cursor-pointer w-8 h-8 rounded-full bg-white text-[#1a1c1c] shadow-md flex items-center justify-center hover:bg-[#0066cc] hover:text-white transition-colors"
                    aria-label="Edit product"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/seller/products/${product._id}`)}
                    className="cursor-pointer w-8 h-8 rounded-full bg-white text-[#ba1a1a] shadow-md flex items-center justify-center hover:bg-[#ba1a1a] hover:text-white transition-colors"
                    aria-label="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mb-6 px-1">
                {product?.images?.slice(1)?.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-1/4 aspect-square rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      alt={`Detail ${idx + 1} of ${product.title}`}
                      className="w-full h-full object-cover"
                      src={img.url}
                    />
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="text-center pb-2 mt-auto">
                <h3 className="text-xl font-semibold text-[#1a1c1c] mb-1 leading-tight">
                  {product.title}
                </h3>
                <p className="text-base font-normal text-[#414753]">
                  <span className="text-[#C05621] font-medium">
                    {product?.price?.currency}{" "}
                  </span>{" "}
                  {product?.price?.amount}.00
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
