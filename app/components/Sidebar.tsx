"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  FolderKanban,
  LogOut,
   Menu,
  X,
  
} from "lucide-react";

export default function Sidebar({isOpen,setIsOpen}:any) {
  return (
    <div className={` w-52 bg-primary mt-20 h-full fixed top-0 left-0 transform transition-transform duration-300 z-50 ${isOpen ?"translate-x-0" : "-translate-x-full"} md:translate-x-0 `} >
      <div className="md:hidden text-secondary">
          {isOpen ? (
            <X onClick={() => setIsOpen(false)} />
          ) : (
            <Menu onClick={() => setIsOpen(true)} />
          )}
        </div>
      {/* Menu Items */}
      <ul className="flex flex-col gap-6 text-white mt-5 px-5">

        <Link href="/admin/dashboard" onClick={()=>setIsOpen(false)}>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-white hover:text-primary px-3 py-2 rounded transition">
            <LayoutDashboard size={20} className="text-secondary"/>
            Dashboard
          </li>
        </Link>
 <Link href="/admin/orders" onClick={() => setIsOpen(false)}>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-white hover:text-primary px-3 py-2 rounded transition">
            <ShoppingCart size={20} className="text-secondary"/>
            Orders
          </li>
        </Link>

        <Link href="/admin/products" onClick={() => setIsOpen(false)}>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-white hover:text-primary px-3 py-2 rounded transition">
            <Package size={20} className="text-secondary"/>
            Products
          </li>
        </Link>

       
        <Link href="/admin/users" onClick={() => setIsOpen(false)}>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-white hover:text-primary px-3 py-2 rounded transition">
            <Users size={20} className="text-secondary"/>
            Users
          </li>
        </Link>

        <Link href="/admin/brands" onClick={() => setIsOpen(false)}>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-white hover:text-primary px-3 py-2 rounded transition">
            <Tag size={20} className="text-secondary"/>
            Brands
          </li>
        </Link>

        <Link href="/admin/categories" onClick={() => setIsOpen(false)}>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-white hover:text-primary px-3 py-2 rounded transition">
            <FolderKanban size={20} className="text-secondary"/>
            Categories
          </li>
        </Link>

      </ul>

      

    </div>
  );
}