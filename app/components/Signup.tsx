"use client";

import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { email,z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {signupSchema} from "../shared/validationschemas/auth.schema"

const Signup = () => {

  // const signupSchema=z.object({
  //   fullName:z.string().nonempty("Full Name is Required").min(3,"Name must be in greater than three letters"),
  //   email:z.string().nonempty("Email is required").email("Enter a Valid email"),
  //   password:z.string().min(6,"Minimum 6 characters required"),
  //   confirmPassword:z.string().min(6,"Minimum 6 characters required")
  // }).refine((data)=>data.password===data.confirmPassword,{
  //   message:"Passwords do not match",
  //   path:["confirmPassword"],
  // })
  type SignupForm=z.infer<typeof signupSchema>
 
const {register,handleSubmit,formState:{errors}}=useForm<SignupForm>({
  resolver:zodResolver(signupSchema)
})
  
const router=useRouter()
  
 


  // 🔹 Handle Submit
  const onSubmit = async (formData:SignupForm) => {
    
    

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Signup successful ✅");

        
        router.push('/login')
      } else {
        alert(data.message || "Signup failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ⚠️");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 mt-20">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Title */}
        <h1 className="text-center font-bold text-2xl sm:text-3xl text-secondary mb-6">
          Create Account ✨
        </h1>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Full Name */}
          <div className="relative mb-4">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              {...register("fullName") }
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            Sign Up →
          </button>

        </form>
        {/* ✅ FORM END */}

        <p className="mt-6 text-center">
          Already have an account{" "}
          <Link href="/login">
            <span className="text-primary cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;