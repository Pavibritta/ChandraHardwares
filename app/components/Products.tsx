import React from "react";
import { Search,Filter } from "lucide-react";
import Image from "next/image";

const Products = () => {
  const products = [
    {
      id: 1,
      categorie: "Electricals",
      productName: "Finolex Copper House Wire (1.5 sq mm)",
      img: "/Wires_Cables.jpg",
      description:
        "High-quality copper wire with fire-resistant insulation, ideal for home electrical wiring.",
      price: "₹950 / 90m coil",
    },
    {
      id: 2,
      categorie: "Electricals",
      productName: "Anchor Roma Modular Switch (6A)",
      img: "/Switches.jpg",
      description:
        "Stylish modular switch with smooth operation and long-lasting performance, ideal for modern homes.",
      price: "₹120 per piece",
    },
    {
      id: 3,
      categorie: "Electricals",
      productName: "Luminous Zelio+ 1100 Home Inverter",
      img: "/Inverters.jpg",
      description:
        "Smart inverter with LCD display, ideal for homes, supports single battery and provides long backup.",
      price: "₹6500",
    },
    {
      id: 4,
      categorie: "Electricals",
      productName: "Bajaj New Shakti Neo 15L Water Heater",
      img: "/Geysers.jpg",
      description:
        "Durable storage water heater with glass-lined tank and fast heating technology.",
      price: "₹7500",
    },
  ];
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-secondary mt-10 text-center" >Explore Our Products</h2>
      <div className="flex gap-6 items-center justify-center p-10">
        <div className="relative flex-1">
          <Search size={18} className="absolute  top-1/2 right-5 -translate-y-1/2 text-gray-700 cursor-pointer"/>
          <input type="search" placeholder="Search Products..." className="w-full outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2"/>
        </div>
        
        <select name="" id="" className=" outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 ">
          <option value="">All Brands</option>
        </select>
      </div>
<div className="grid md:grid-cols-4 grid-cols-2 gap-3 mb-6 p-3">
  {products.map((product)=>(
        <div key={product.id} className=" cursor-pointer border border-gray-300 rounded-lg shadow hover:scale-105 transition-all ease-linear duration-300 flex items-center flex-col">
            <Image src={product.img} alt={product.productName} height={200} width={200} />
            <div className="p-3">
              <h2 className="text-center font-extrabold text-primary">{product.productName}</h2>
            <p className="text-sm py-3 px-1">{product.description}</p>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-primary">{product.price}</h3>
            <button className="group bg-secondary hover:bg-secondary/90 text-white px-5 py-2 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
            Add To Cart
            
          </button>
            </div>
            </div>
            
            
          </div>
      ))}
</div>
      
    </>
  );
};

export default Products;
