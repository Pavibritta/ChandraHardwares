"use client";

import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Mock Data
    const mockOrders = [
      {
        id: "ORD12345",
        date: "2026-04-10",
        total: 1200,
        status: "Delivered",
        items: [
          { name: "Hammer", qty: 1, price: 500 },
          { name: "Nails Pack", qty: 2, price: 350 },
        ],
      },
      {
        id: "ORD12346",
        date: "2026-04-12",
        total: 800,
        status: "Pending",
        items: [
          { name: "Screwdriver Set", qty: 1, price: 800 },
        ],
      },
      {
        id: "ORD12347",
        date: "2026-04-13",
        total: 1500,
        status: "Cancelled",
        items: [
          { name: "Drill Machine", qty: 1, price: 1500 },
        ],
      },
    ];

    // simulate API delay
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading orders...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-bold mb-6 text-primary">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl shadow-md p-5 bg-white"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {order.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg text-primary">
                    ₹{order.total}
                  </p>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4 space-y-2">
                {order.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <p>
                      {item.name} × {item.qty}
                    </p>
                    <p>₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;