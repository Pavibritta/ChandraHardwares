"use client"
import React, { useEffect, useState } from 'react'
import { Search,Pencil, Trash2 } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const products = () => {


type Products = {
  _id: string,
  name: string,
  image: string,
  category: {
    _id: string,
    name: string
  },
  brand: string,
  stock: number,
  price: number,
  description: string
}
const [products,setProducts]=useState<Products[]>([])
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
);
useEffect(()=>{
const fetchProducts=async ()=>{
  try{
    const res=await fetch('/api/products')
    const data=await res.json()
    console.log("products",data)
    setProducts(data)
  }catch(error){
console.log(error)
  }
}
fetchProducts()
},[])

//delete product
const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted successfully");

      // refresh list
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
    <div className='mt-20 bg-gray-50 px-3 py-2'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl text-primary'>Products</h1>
        <div className="relative  mx-auto w-full max-w-xl">
                <Search size={18} className="absolute  top-1/2 right-5 -translate-y-1/2 text-gray-700 cursor-pointer"/>
                <input
  type="search"
  placeholder="Search Products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full outline-none shadow rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary px-3 py-2 max-w-xl"
/>
              </div>
        <Link href='/admin/addproduct'>
        <button className='bg-secondary text-white rounded shadow px-3 py-2 font-bold hover:bg-secondary/80 transition-all ease-in-out duration-300 cursor-pointer'>+ Add Product</button>
        </Link>
        
      </div>
      
      

  
    {/* Scroll only when needed */}
    <div className="w-full max-w-full overflow-hidden mt-5 shadow-sm rounded-lg border border-gray-100">

      <table className="max-w-[300px] w-full text-sm text-left ">

        {/* Header */}
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="text-gray-600">
          {filteredProducts.map((product) => (
            <tr key={product._id} className="border-t hover:bg-secondary/10">

              {/* Image */}
              <td className="px-4 py-3 lg:whitespace-nowrap">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
              </td>

              {/* Name */}
              <td className="px-4 py-3 whitespace-nowrap">
                {product.name}
              </td>

              {/* Category */}
              <td className="px-4 py-3 whitespace-nowrap">
                {product.category?.name}
              </td>

              {/* Brand */}
              <td className="px-4 py-3 whitespace-nowrap">
                {product.brand}
              </td>

              {/* Stock */}
              <td className="px-4 py-3 whitespace-nowrap">
                {product.stock}
              </td>

              {/* Price */}
              <td className="px-4 py-3 whitespace-nowrap font-semibold">
                ₹{product.price}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                 <Link href={`/admin/addproduct?id=${product._id}`}>
  <button className="bg-primary rounded p-2">
    <Pencil size={15} className="text-secondary" />
  </button>
</Link>
                  <button className="bg-primary rounded p-2 cursor-pointer" onClick={() => handleDelete(product._id)}>
                    <Trash2 size={15} className="text-secondary"  />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
{filteredProducts.length === 0 && (
  <tr>
    <td colSpan={7} className="text-center py-5 text-gray-500">
      No products found
    </td>
  </tr>
)}
      </table>
    </div>
 

       

    </div>
    
      
    </>
  )
}

export default products