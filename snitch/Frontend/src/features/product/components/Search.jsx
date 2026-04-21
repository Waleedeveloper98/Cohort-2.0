import React, { useState } from "react";
import { useProduct } from "../hook/useProduct";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");

  const { handleSearchProducts, handleGetAllProducts } = useProduct();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      handleGetAllProducts();
      return;
    }
    handleSearchProducts({ query: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      handleGetAllProducts();
      return;
    }
    handleSearchProducts({ query });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 mb-8 px-4">
      <form 
        onSubmit={onSubmit} 
        className="relative flex items-center w-full h-12 rounded-full shadow-sm bg-white overflow-hidden border border-gray-300 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all group"
      >
        <div className="grid place-items-center h-full w-14 text-gray-400 group-focus-within:text-black transition-colors">
          <SearchIcon className="h-5 w-5" />
        </div>

        <input
          value={query}
          onChange={handleSearch}
          type="search"
          placeholder="Search for products, categories, or brands..."
          className="peer h-full w-full outline-none text-sm text-gray-800 pr-2 bg-transparent placeholder-gray-400"
        />

        <button
          type="submit"
          className="h-full px-6 md:px-8 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
