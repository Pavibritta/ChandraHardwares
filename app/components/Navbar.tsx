"use client";

import React, { useState,useEffect } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  LogIn,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
const searchQuery = searchParams.get("search") || "";
useEffect(() => {
  setSearch(searchQuery);
}, [searchQuery]);

  // ✅ Role checks
  const isAdmin = user?.role === "admin";
  const isUser = user && user.role === "user";
  const isGuest = !user;

  // ✅ Minimal menu
  const menu = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  // ✅ Logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Logout failed");
      }
    } catch (error: any ) {
      alert(error.message || "Something went wrong");
    }

    logout();
    router.push("/");
  };

  // ✅ Search handler
 const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearch(value);

  router.push(`/shop?search=${value}`);
};

  // ================= ADMIN NAVBAR =================
  if (isAdmin) {
    return (
      <header className="w-full z-50">
        <nav className="flex justify-between bg-primary items-center h-20 fixed w-full px-6 md:px-10 z-50">
          <Image
            src="/chandra hardware finals copy 1.png"
            alt="logo"
            height={50}
            width={150}
          />

          <div className="flex items-center gap-6 text-secondary">
            <Link href="/admin/profile">
              <User className="cursor-pointer" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-500 hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
           {/* Mobile Toggle */}
        
        </nav>

        
      </header>
    );
  }

  // ================= USER + GUEST NAVBAR =================
  return (
    <header className="w-full z-50">
      <nav className="flex justify-between bg-primary items-center h-20 fixed w-full px-6 md:px-10 z-50">

        {/* Logo */}
        <Image
          src="/chandra hardware finals copy 1.png"
          alt="logo"
          height={50}
          width={150}
        />

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-secondary">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`px-3 py-2 rounded font-bold ${
                  pathName === item.path
                    ? "bg-secondary text-primary"
                    : "hover:bg-secondary hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 🔍 Search Bar */}
        <div className="hidden md:flex items-center">
         <input
  type="search"
  placeholder="Search Products..."
  className="w-full px-4 py-2 rounded border outline-none border-white placeholder:text-white text-white"
  value={search}
  onChange={(e) => {
    const value = e.target.value;
    setSearch(value);
    router.push(`/shop?search=${value}`);
  }}
/>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 text-secondary">

          {/*  USER */}
          {isUser && (
            <>
              <span className="font-semibold">Hi, {user.name}</span>

              <Link href="/addtocart">
                <ShoppingCart />
              </Link>

              <Link href="/orders">
                <User />
              </Link>

              <button onClick={handleLogout}>
                <LogOut className="text-red-500" />
              </button>
            </>
          )}

          {/*  GUEST */}
          {isGuest && (
            <Link href="/login">
              <LogIn />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-secondary">
          {isOpen ? (
            <X onClick={() => setIsOpen(false)} />
          ) : (
            <Menu onClick={() => setIsOpen(true)} />
          )}
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="md:hidden bg-primary mt-20 px-6 py-5 space-y-6 text-secondary">

          {/* Menu */}
          <ul className="flex flex-col gap-5 items-center">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

         
<input
  type="search"
  placeholder="Search Products..."
  className="w-full px-4 py-2 rounded border outline-none"
  value={search}
  onChange={(e) => {
    const value = e.target.value;
    setSearch(value);
    router.push(`/shop?search=${value}`);
  }}
/>
          {/* Actions */}
          <div className="flex flex-col items-center gap-5 border-t pt-5">

            {/* USER */}
            {isUser && (
              <>
                <span>Hi, {user.name}</span>

                <Link href="/addtocart">
                  <ShoppingCart />
                </Link>

                <Link href="/orders">
                  <User />
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="text-red-500" />
                </button>
              </>
            )}

            {/* GUEST */}
            {isGuest && (
              <Link href="/login">
                <LogIn />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;