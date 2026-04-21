import React, { useState } from "react";
import { useProduct } from "../hook/useProduct";

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

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        type="search"
        placeholder="Search"
        className="border border-gray-300 rounded-md px-4 py-2 mt-6 w-3/5"
      />
    </div>
  );
};

export default Search;
