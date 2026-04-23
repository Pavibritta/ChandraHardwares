"use client";

import React, { Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const LayoutWrapper = ({ children }: any) => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* ✅ Wrap Navbar with Suspense */}
      <Suspense fallback={<div className="h-20 bg-primary"></div>}>
        <Navbar />
      </Suspense>

      {children}

      {!isAdmin && <Footer />}
    </>
  );
};

export default LayoutWrapper;