"use client";
import React, { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 mt-20 px-3 py-2">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6">

        {/* Products */}
        <div className="bg-white shadow rounded border px-3 py-4 hover:scale-105 transition">
          <div className="flex gap-4 items-center justify-center">
            <Package size={28} className="text-secondary" />
            <h1 className="text-lg font-bold text-primary">Products</h1>
          </div>
          <p className="text-center text-2xl font-bold text-secondary">
            {stats.totalProducts}
          </p>
        </div>

        {/* Orders */}
        <div className="bg-white shadow rounded border px-3 py-4 hover:scale-105 transition">
          <div className="flex gap-4 items-center justify-center">
            <ShoppingCart size={28} className="text-secondary" />
            <h1 className="text-lg font-bold text-primary">Orders</h1>
          </div>
          <p className="text-center text-2xl font-bold text-secondary">
            {stats.totalOrders}
          </p>
        </div>

        {/* Users */}
        <div className="bg-white shadow rounded border px-3 py-4 hover:scale-105 transition">
          <div className="flex gap-4 items-center justify-center">
            <Users size={28} className="text-secondary" />
            <h1 className="text-lg font-bold text-primary">Users</h1>
          </div>
          <p className="text-center text-2xl font-bold text-secondary">
            {stats.totalUsers}
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow rounded border px-3 py-4 hover:scale-105 transition">
          <div className="flex gap-4 items-center justify-center">
            <IndianRupee size={28} className="text-secondary" />
            <h1 className="text-lg font-bold text-primary">Revenue</h1>
          </div>
          <p className="text-center text-2xl font-bold text-secondary">
            ₹{stats.totalRevenue}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;