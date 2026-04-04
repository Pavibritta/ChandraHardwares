"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router=useRouter()
  const handleLogin=()=>{
    localStorage.setItem("admin", "true");
router.push("/admin");
  }
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">

      {/* Card */}
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Title */}
        <div className="flex justify-center items-center">
          <Image
                  src="/chandra hardware finals copy 1.png"
                  alt="logo"
                  height={50}
                  width={150}
                />

        </div>
      
        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div className="relative mb-10">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
          />
          <p className="absolute right-5 mt-3 text-red-500 text-sm cursor-pointer">Forgot Password ?</p>
        </div>
        
        {/* Button */}
        <button className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" onClick={()=>{handleLogin()}}>
          Login →
        </button>
        
      </div>
    </div>
  );
}