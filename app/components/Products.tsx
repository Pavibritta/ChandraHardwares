"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const selectedCategory = searchParams.get("category");

  type ProductType = {
    _id: string;
    name: string;
    image: string;
    category: string | {  
      _id: string;
      name: string;
      image: string;
    } | null;
    brand: string;
    stock: number;
    price: number;
    description: string;
  };

  type Category = {
    _id: string;
    name: string;
    image: string;
  };

  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const searchQuery = searchParams.get("search") || "";

  // ✅ Fetch products with category population
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Try to fetch with populated categories
        const res = await fetch("/api/products?populate=category");
        const data = await res.json();
        console.log("Raw products data:", data);
        
        // Debug: Check category structure
        if (data && data.length > 0) {
          console.log("First product category structure:", data[0].category);
          console.log("All products with their categories:");
          data.forEach((p: any, idx: number) => {
            console.log(`${idx + 1}. ${p.name} - Category:`, p.category);
          });
        }
        
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // ✅ HELPER: Get category ID from product
  const getCategoryId = (product: ProductType): string => {
    if (!product.category) return "";
    if (typeof product.category === 'string') {
      return product.category;
    }
    if (typeof product.category === 'object' && product.category._id) {
      return product.category._id;
    }
    return "";
  };

  // ✅ HELPER: Get category name from product
  const getCategoryName = (product: ProductType): string => {
    if (!product.category) return "Uncategorized";
    if (typeof product.category === 'string') {
      const foundCategory = categories.find(cat => cat._id === product.category);
      return foundCategory?.name || "Uncategorized";
    }
    if (typeof product.category === 'object' && product.category.name) {
      return product.category.name;
    }
    return "Uncategorized";
  };

  // ✅ FIXED Filter logic with better debugging
  const filteredProducts = products.filter((product) => {
    const productCategoryId = getCategoryId(product);
    
   
    
    // Category filter
    let matchesCategory = true;
    if (selectedCategory && selectedCategory !== "") {
      matchesCategory = productCategoryId === selectedCategory;
    }
    
    // Search filter
    let matchesSearch = true;
    if (searchQuery && searchQuery.trim() !== "") {
  matchesSearch = product.name
    ?.toLowerCase()
    .includes(searchQuery.toLowerCase());
}
    
    return matchesCategory && matchesSearch;
  });

  // ✅ Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value && value !== "") {
      router.push(`/shop?category=${value}`);
    } else {
      router.push(`/shop`);
    }
  };

  const handleAddToCart = async (productId: string) => {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Added to cart ✅");
    }
  } catch (error) {
    console.log(error);
  }
};

  // ✅ Clear all filters
  const clearFilters = () => {
    setSearch("");
    router.push(`/shop`);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary mt-10 text-center">
        Explore Our Products
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Discover our wide range of high-quality products
      </p>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center p-6 mx-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="Search Products..."
            value={search}
             onChange={(e) => {
    const value = e.target.value;
    setSearch(value);

    // ✅ update URL (IMPORTANT)
    router.push(`/shop?search=${value}`);
  }}
            className="w-full outline-none shadow-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent px-4 py-2 pr-10"
          />
        </div>

        {/* Category Dropdown */}
        <select
          onChange={handleCategoryChange}
          value={selectedCategory || ""}
          className="shadow-sm rounded-lg border border-gray-200 px-4 py-2 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-w-[180px]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {(selectedCategory || search) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="px-6 mx-10 mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* 🛒 Products Grid */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mb-6 p-6 mx-4 md:mx-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-white overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-40 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-bold text-lg text-primary line-clamp-1">
                  {product.name}
                </h2>

                {/* Category badge */}
                <div className="mt-1">
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                    {getCategoryName(product)}
                  </span>
                </div>

                <p className="text-sm py-4 text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                {/* Stock status */}
                <div className="mt-1">
                  <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-2">
                  <h3 className="font-bold text-2xl text-primary">
                    ₹{product.price.toLocaleString()}
                  </h3>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => router.push(`/shop/${product._id}`)}
                    className="bg-primary text-white px-3 py-2 rounded-lg text-sm flex-1 hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </button>

                  {user && product.stock > 0 && (
                    <button className="bg-secondary text-white px-3 py-2 rounded-lg text-sm flex-1 hover:bg-secondary/90 transition-colors" onClick={() => handleAddToCart(product._id)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm mt-2">
              {selectedCategory ? "No products available in this category yet." : "Try adjusting your search or category filter"}
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      
    </>
  );
};

export default Products;