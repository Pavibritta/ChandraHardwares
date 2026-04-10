"use client";
import React, { useState } from 'react'
import { Mail, Lock,User } from "lucide-react";
import Link from "next/link";

const Signup = () => {
  const [users,setUsers]=useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const [errors,setErrors]=useState({})
  const validateForm = () => {
  let newErrors = {};

  // Full Name
  if (!users.fullName.trim()) {
    newErrors.fullName = "Full Name is required";
  }

  // Email
  if (!users.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(users.email)) {
    newErrors.email = "Enter valid email";
  }

  // Password
  if (!users.password) {
    newErrors.password = "Password is required";
  } else if (users.password.length < 6) {
    newErrors.password = "Minimum 6 characters required";
  }

  // Confirm Password
  if (!users.confirmPassword) {
    newErrors.confirmPassword = "Confirm your password";
  } else if (users.password !== users.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleSubmit=async(e)=>{
e.preventDefault()
if (!validateForm()){
  return
}
try{
const res=await fetch("http://localhost:5000/register",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(users)
})
const data= await res.json()
alert(data.message)
}catch(error){
  alert(error)
}
setUsers({fullName:"",
    email:"",
    password:"",
    confirmPassword:""})
console.log(users)
}
const handleChange=(e)=>{
const {name,value}=e.target

setUsers((prev)=>({
  ...prev,[name]:value
}))
}
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
            name='fullName'
            value={users.fullName}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
            onChange={handleChange}
          />
          {errors.fullName && (
  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
)}
        </div>
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={users.email}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
            onChange={handleChange}
          />
          {errors.email && (
  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
)}
        </div>

        {/* Password */}
        <div className="relative mb-10">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={users.password}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
            onChange={handleChange}
          />
          {errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
)}
        </div>

        <div className="relative mb-10">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="password"
            placeholder="Confirm Password"
            name='confirmPassword'
            value={users.confirmPassword}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
  <p className="text-red-500 text-sm mt-1">
    {errors.confirmPassword}
  </p>
)}
        </div>
        
        {/* Button */}
        <button className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" onClick={handleSubmit}>
          Sign Up →
        </button>
        <p className="mt-10 text-center">Already have an account <Link href='/login'><span className="text-primary cursor-pointer">Login</span></Link></p>
      </div>
    </div>
    </>
  )
}

export default Signup