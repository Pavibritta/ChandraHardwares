"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, LogIn,Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const [isOpen,setIsOpen]=useState(false)
  const menu = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Shop", path: "/shop" },
    { name: "Brands", path: "/brands" },
  ];
  return (
    <>
      <header className="w-full z-50">
        <nav className="flex justify-between bg-primary max-w-8xl items-center h-20 fixed w-full p-10 z-50">
          <Image
            src="/chandra hardware finals copy 1.png"
            alt="logo"
            height={50}
            width={150}
          />

          <ul className=" hidden md:flex justify-between items-center gap-10 text-secondary">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`px-3 py-2 rounded transition-all ease-in-out duration-300 cursor-pointer font-bold ${pathName == item.path ? "bg-secondary text-primary" : "hover:bg-secondary hover:text-primary"}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex justify-between items-center text-secondary gap-10">
            <Link href='/addtocart'><ShoppingCart size={22} className="cursor-pointer" /></Link>
            
            <Link href='/login'><LogIn size={22} className="cursor-pointer"/></Link>
          </div>

          <div className="md:hidden text-secondary">
            {isOpen && <X onClick={()=>setIsOpen(false)} className="cursor-pointer"/>}
            {!isOpen && <Menu onClick={()=>setIsOpen(true)} className="cursor-pointer"/>}
            
          </div>
         
          
        </nav>

         {isOpen &&  <ul className=" md:hidden flex justify-between items-center gap-10 text-secondary flex-col bg-primary  w-full px-6 py-5 mt-20 space-y-4 z-50">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`px-3 py-2 rounded transition-all ease-in-out duration-300 cursor-pointer font-bold ${pathName == item.path ? "bg-secondary text-primary" : "hover:bg-secondary hover:text-primary"}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>}
{isOpen && <div className="md:hidden flex flex-col justify-between items-center text-secondary gap-10 bg-primary  w-full z-50">
            <Link href='/addtocart'><ShoppingCart size={22} className="cursor-pointer" /></Link>
            <LogIn size={18}/>
          </div>}
          
      </header>
    </>
  );
};

export default Navbar;
