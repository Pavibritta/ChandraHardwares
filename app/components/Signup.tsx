import React from 'react'
import { Mail, Lock,User } from "lucide-react";
import Link from "next/link";

const Signup = () => {
  return (
    <>
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 mt-20">

      {/* Card */}
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Title */}
        <h1 className="text-center font-bold text-2xl sm:text-3xl text-secondary mb-6">
          Create Account ✨
        </h1>

        {/* Email */}

        <div className="relative mb-4">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Full Name "
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
          />
        </div>
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div className="relative mb-10">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
          />
          
        </div>

        <div className="relative mb-10">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
          />
          
        </div>
        
        {/* Button */}
        <button className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
          Sign Up →
        </button>
        <p className="mt-10 text-center">Already have an account <Link href='/login'><span className="text-primary cursor-pointer">Login</span></Link></p>
      </div>
    </div>
    </>
  )
}

export default Signup