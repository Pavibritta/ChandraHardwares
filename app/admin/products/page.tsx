import React from 'react'
import { Search,Pencil, Trash2 } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const products = () => {
const products = [
    {
      id: 1,
      categorie: "Electricals",
      productName: "Finolex Copper House Wire (1.5 sq mm)",
      img: "/Wires_Cables.jpg",
      description:
        "High-quality copper wire with fire-resistant insulation, ideal for home electrical wiring.",
      price: "₹950 / 90m coil",
      brand:"Finolex",
      stock:100,
    },
    {
      id: 2,
      categorie: "Electricals",
      productName: "Anchor Roma Modular Switch (6A)",
      img: "/Switches.jpg",
      description:
        "Stylish modular switch with smooth operation and long-lasting performance, ideal for modern homes.",
      price: "₹120 per piece",
      brand:"Anchor Roma",
      stock:500,
    },
    {
      id: 3,
      categorie: "Electricals",
      productName: "Luminous Zelio+ 1100 Home Inverter",
      img: "/Inverters.jpg",
      description:
        "Smart inverter with LCD display, ideal for homes, supports single battery and provides long backup.",
      price: "₹6500",
      brand:"Luminous",
      stock:50,
    },
    {
      id: 4,
      categorie: "Electricals",
      productName: "Bajaj New Shakti Neo 15L Water Heater",
      img: "/Geysers.jpg",
      description:
        "Durable storage water heater with glass-lined tank and fast heating technology.",
      price: "₹7500",
      brand:"Bajaj",
      stock:20,
    },
  ];
  return (
    <>
    <div className='mt-20 bg-gray-50 px-3 py-2'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl text-primary'>Products</h1>
        <div className="relative  mx-auto w-full max-w-xl">
                <Search size={18} className="absolute  top-1/2 right-5 -translate-y-1/2 text-gray-700 cursor-pointer"/>
                <input type="search" placeholder="Search Products..." className="w-full outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 max-w-xl"/>
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
          {products.map((product) => (
            <tr key={product.id} className="border-t hover:bg-secondary/10">

              {/* Image */}
              <td className="px-4 py-3 lg:whitespace-nowrap">
                <Image
                  src={product.img}
                  alt={product.productName}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
              </td>

              {/* Name */}
              <td className="px-4 py-3 whitespace-nowrap">
                {product.productName}
              </td>

              {/* Category */}
              <td className="px-4 py-3 whitespace-nowrap">
                {product.categorie}
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
                {product.price}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="bg-primary rounded p-2">
                    <Pencil size={15} className="text-secondary" />
                  </button>

                  <button className="bg-primary rounded p-2">
                    <Trash2 size={15} className="text-secondary" />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
 

       

    </div>
    
      
    </>
  )
}

export default products