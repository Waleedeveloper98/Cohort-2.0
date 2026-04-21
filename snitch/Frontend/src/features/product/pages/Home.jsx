import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";
import Search from "../components/Search";

const Home = () => {
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();
  useEffect(() => {
    handleGetAllProducts();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <header className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 mb-4">
            Featured selection
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            Discover modern essentials for every day.
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600 leading-7">
            Explore a curated collection of clean, timeless pieces with subtle
            polish and thoughtful comfort.
          </p>

          <Search />
        </header>

        <section className="space-y-6 px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                All Products
              </h2>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products?.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
