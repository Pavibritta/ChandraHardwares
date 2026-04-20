"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import {email, z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@shared/validationschemas/auth.schema";

export default function Login() {
  
  
  const router = useRouter();
  const {login}=useAuth()
  // const loginSchema=z.object({
  //   email:z.string().nonempty("Email is required").email("Enter a valid email address"),
  //   password:z.string().min(6,"Minimum 6 characters required")

  // })
 type LoginForm=z.infer<typeof loginSchema>
const {register,handleSubmit,formState:{errors},}=useForm<LoginForm>({
  resolver:zodResolver(loginSchema)
})
  

  const onSubmit = async (formData :LoginForm ) => {
   

   

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      
      // ✅ CHECK RESPONSE STATUS
      if (!res.ok) {
        alert(data.error || "Login failed ❌");
        return; // ❗ STOP here
      }

      // ✅ SUCCESS ONLY
      alert("Login successful ✅");
login(data.user) 
      
      if (data.user.role == "user") {
        router.push("/user");
      } else {
        router.push("/admin/dashboard");
      }
      // navigate only on success
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <form className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center font-bold text-2xl text-secondary mb-6">
          Welcome Back 👋
        </h1>

        <div className="relative mb-4">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="email"
            {...register ("email")} 
            placeholder="Enter Your Email"
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative mb-4">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Enter Your Password"
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-lg"
        >
          Login →
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
