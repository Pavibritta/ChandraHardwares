"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User, Menu, X,LogOut } from "lucide-react"; // ✅ replaced icons
import Link from "next/link";
import Sidebar from "./Sidebar";

const AdminNavbar = ({isOpen,setIsOpen}:any) => {
  

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

          {/* Desktop */}
<div className="flex items-center gap-6 text-secondary">
  
  {/* Profile Icon */}
  <Link href="/admin/profile">
    <User
      size={24}
      className="cursor-pointer hover:bg-secondary/20 transition"
    />
  </Link>

  {/* Logout */}
  <Link href="/admin/login" onClick={()=>localStorage.removeItem("admin")}>
    <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded hover:bg-red-500 hover:text-white transition">
      <LogOut size={18}  />
      <span className="text-sm font-medium">Logout</span>
    </div>
  </Link>

</div>
          {/* Logout */}
     

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-secondary">
            {isOpen ? (
              <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
            ) : (
              <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {/* {isOpen && (
          <div className="md:hidden flex flex-col justify-center items-center text-secondary gap-6 bg-primary w-full z-50 py-5">
            <Link href="/profile">
              <User size={24} className="cursor-pointer" />
            </Link>
          </div>
        )} */}
      </header>
      
    </>
  );
};

export default AdminNavbar;