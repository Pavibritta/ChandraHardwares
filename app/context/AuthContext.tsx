"use client";

import React, { createContext, useState, useEffect,useContext } from "react";
import Cookies from "js-cookie";
 const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);
  const login = (userData: any) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    setUser(userData);
  };
  const logout = () => {
    Cookies.remove("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth=()=>{
  const context=useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}