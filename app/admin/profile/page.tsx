"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AdminProfile() {
  const [form, setForm] = useState({
    name: "Pavithra",
    email: "admin@gmail.com",
    phone: "9876543210",
    role: "Admin",
  });

  const [image, setImage] = useState("/profile.png");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6">

      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">Admin Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT - Profile Card */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">

          {/* Profile Image */}
          <div className="relative">
            <Image
                        src="/chandra hardware finals copy 1.png"
                        alt="logo"
                        height={50}
                        width={150}
                      />
            

            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer text-xs">
              Edit
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name */}
          <h2 className="mt-4 text-lg font-semibold">{form.name}</h2>
          <p className="text-gray-500 text-sm">{form.role}</p>

          {/* Info */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>{form.email}</p>
            <p>{form.phone}</p>
          </div>
        </div>

        {/* RIGHT - Edit Form */}
        <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Role */}
            <input
              type="text"
              name="role"
              value={form.role}
              disabled
              className="border p-3 rounded-lg bg-gray-100"
            />

          </div>

          {/* Save Button */}
          <button className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}