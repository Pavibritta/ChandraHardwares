"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AdminProfile() {
  const [form] = useState({
    name: "Pavithra",
    email: "admin@gmail.com",
    phone: "9876543210",
    role: "Admin",
  });

 const [image, setImage] = useState("/chandra hardware finals copy 1.png");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">

        {/* Profile Image */}
        <div className="relative mx-auto w-28 h-28">
          <Image
            src={image}
            alt="Profile"
            fill
            className="rounded-full object-cover border"
          />

          {/* Upload Button */}
          <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer text-xs">
            ✎
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Name */}
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {form.name}
        </h2>

        {/* Role */}
        <p className="text-sm text-gray-500">{form.role}</p>

        {/* Divider */}
        <div className="my-4 border-t"></div>

        {/* Info */}
        <div className="text-sm text-gray-600 space-y-2">
          <p><span className="font-medium">Email:</span> {form.email}</p>
          <p><span className="font-medium">Phone:</span> {form.phone}</p>
        </div>

      </div>
    </div>
  );
}