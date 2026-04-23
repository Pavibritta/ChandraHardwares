"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

type Category = {
  _id: string;
  name: string;
  image: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
const [search, setSearch] = useState("");
const filteredCategories = categories.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        console.log("data:", data);

        // safe handling
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Deleted successfully");

        setCategories((prev) =>
          prev.filter((item) => item._id !== id)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="mt-20 bg-gray-50 px-4 py-6 min-h-screen">
  
  {/* HEADER */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    <h1 className="text-2xl font-bold text-primary">Categories</h1>

    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="search"
        placeholder="Search Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
      />
    </div>

    <Link href="/admin/addcategory">
      <button className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary/80 transition">
        + Add Category
      </button>
    </Link>
  </div>

  {/* GRID */}
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredCategories.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
      >
        {/* IMAGE */}
        <div className="relative h-48">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />

          {/* ACTION BUTTONS */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <Link href={`/admin/addcategory?id=${item._id}`}>
              <button className="bg-white p-2 rounded shadow">
                <Pencil size={14} />
              </button>
            </Link>

            <button
              onClick={() => handleDelete(item._id)}
              className="bg-white p-2 rounded shadow"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {item.name}
          </h2>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Categories;