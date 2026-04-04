"use client";
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import { useRouter, usePathname } from 'next/navigation';

const AdminWrapper = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin");

    if (!isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname]);

  // Hide layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-full">
      <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

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