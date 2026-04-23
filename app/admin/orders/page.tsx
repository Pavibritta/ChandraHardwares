"use client";

import React, { useEffect, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("orders",data)
      setOrders(data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= STATUS UPDATE =================
  const changeStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(
        `/api/orders/update/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: data.order.status } : o
          )
        );
      }
    } catch (error) {
      console.log("Status update error:", error);
    }
  };

  // ================= FILTER LOGIC =================
  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase());

    const matchDate = dateFilter
      ? new Date(order.createdAt).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;

    return matchSearch && matchDate;
  });

  return (
    <div className="mt-20 bg-gray-50 px-4 py-3">

      {/* HEADER */}
      <div className="flex gap-3 items-center mb-4">
        <h1 className="font-bold text-xl text-primary">
          Order Management
        </h1>

        {/* SEARCH */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          />
          <input
            type="search"
            placeholder="Search Orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* DATE FILTER */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        />
      </div>

      {/* TABLE */}
      <table className="w-full border rounded-lg shadow-sm bg-white">
        <thead className="bg-gray-100 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Order ID</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Payment</th>
            {/* <th className="px-4 py-3 text-left">Actions</th> */}
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {filteredOrders.map((order) => (
            <tr
              key={order._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{order._id}</td>

              <td className="px-4 py-3">
                {order.user?.email || "Guest"}
              </td>

              <td className="px-4 py-3">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 font-medium">
                ₹{order.totalAmount}
              </td>

              {/* STATUS CHANGE */}
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  onChange={(e) =>
                    changeStatus(order._id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              <td className="px-4 py-3">
                {order.paymentMethod || "COD"}
              </td>

              {/* ACTIONS */}
              {/* <td className="px-4 py-3 flex gap-2">
                <button className="bg-primary p-2 rounded text-white">
                  <Pencil size={15} />
                </button>

                <button className="bg-red-500 p-2 rounded text-white">
                  <Trash2 size={15} />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;