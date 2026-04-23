"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const AdminWrapper = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuth(); // ✅ get user

  useEffect(() => {
    //  Not logged in
    if (!user) {
      router.push("/login");
      return;
    }

    //  Not admin
    if (user.role !== "admin") {
      router.push("/"); // redirect normal user
    }
  }, [user]);

  //  Hide layout on login page
  if (pathname === "/login") {
    return <>{children}</>;
  }

  //  Wait until user is loaded
  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  //  If not admin, block UI
  if (user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex flex-col min-h-full">
      <Navbar  />

      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 p-4 md:ml-55">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminWrapper;