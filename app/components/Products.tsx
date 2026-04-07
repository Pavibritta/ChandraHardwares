"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import products from "../data/products.json";
import { useSearchParams, useRouter } from "next/navigation";

const Products = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("category");

  const [search, setSearch] = useState("");

  // ✅ Get unique categories for dropdown
  const categories = [...new Set(products.map((p) => p.category))];

  // ✅ Filter products (category + search)
 const filteredProducts = products.filter((p) => {
  const category = p.category || ""; // ✅ prevent undefined
console.log("Selected:", selectedCategory);
console.log("Product category:", p.category);
  const matchCategory = selectedCategory
    ? category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
    : true;

  const matchSearch = p.productName
    ?.toLowerCase()
    .includes(search.toLowerCase());

  return matchCategory && matchSearch;
});
  // ✅ Handle category change
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (value) {
      router.push(`/shop?category=${value}`);
    } else {
      router.push(`/shop`);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-secondary mt-10 text-center">
        Explore Our Products
      </h2>

      {/* 🔍 Search + Filter */}
      <div className="flex gap-6 items-center justify-center p-10 mx-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-700"
          />
          <input
            type="search"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none shadow rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary px-3 py-2"
          />
        </div>

        {/* Category Dropdown */}
        <select
          onChange={handleCategoryChange}
          value={selectedCategory || ""}
          className="shadow rounded-lg border border-gray-200 px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🛒 Products */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-3 mb-6 p-3 mx-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg shadow hover:scale-105 transition-all flex flex-col items-center"
            >
              <Image
                src={product.img}
                alt={product.productName}
                width={200}
                height={200}
              />

              <div className="p-3">
                <h2 className="text-center font-extrabold text-primary">
                  {product.productName}
                </h2>

                <p className="text-sm py-3 px-1">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-primary">
                    {product.price}
                  </h3>

                  <button className="bg-secondary text-white px-5 py-2 rounded-lg font-semibold">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found
          </p>
        )}
      </div>
    </>
  );
};

export default Products;