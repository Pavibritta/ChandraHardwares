"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const LayoutWrapper = ({ children }: any) => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <>
      <Navbar />
      {children}
      {!isAdmin && <Footer />} {/* ✅ Hide footer for admin */}
    </>
  );
};

export default LayoutWrapper;