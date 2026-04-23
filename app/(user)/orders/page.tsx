"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "app/context/AuthContext";

const Orders = () => {
  const { user } = useAuth(); // 👈 get logged-in user
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/orders/${user._id}`, // 👈 IMPORTANT
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      console.log("orders:", data);

      setOrders(data || []);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  const cancelOrder = async (orderId: string) => {
  try {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to cancel order");
      return;
    }

    // ✅ update UI instantly
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  } catch (error) {
    console.log("Cancel error:", error);
  }
};

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
          {orders.map((order: any) => (
          <div
  key={order._id}
  className="border rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition"
>
  {/* Header */}
  <div className="flex justify-between items-start mb-4">
    <div>
      <p className="font-semibold text-gray-800">
        Order ID:{" "}
        <span className="text-gray-600 text-sm">{order._id}</span>
      </p>

      <p className="text-xs text-gray-500">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>

    <div className="text-right">
      <p className="font-bold text-lg text-green-600">
        ₹{order.totalAmount}
      </p>

      <span
        className={`text-xs px-3 py-1 rounded-full font-medium ${
          order.status === "Delivered"
            ? "bg-green-100 text-green-700"
            : order.status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : order.status === "Cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {order.status}
      </span>
    </div>
  </div>

  {/* Items */}
  <div className="border-t pt-4 space-y-3">
    {order.items?.map((item: any, index: number) => (
      <div key={index} className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-3">
          <img
            src={item.product?.image}
            alt={item.product?.name}
            className="w-12 h-12 rounded object-cover border"
          />

          <div>
            <p className="text-sm font-medium text-gray-800">
              {item.product?.name}
            </p>
            <p className="text-xs text-gray-500">
              Qty: {item.quantity} × ₹{item.product?.price}
            </p>
          </div>
        </div>

        {/* right */}
        <p className="font-semibold text-gray-900">
          ₹{item.product?.price * item.quantity}
        </p>
      </div>
    ))}
  </div>

  {/* Actions */}
  <div className="mt-4 flex justify-end">
    {order.status === "Pending" ? (
      <button
        onClick={() => cancelOrder(order._id)}
        className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Cancel Order
      </button>
    ) : (
      <p className="text-xs text-gray-400">
        {order.status === "Cancelled"
          ? "Order Cancelled"
          : "Cannot cancel this order"}
      </p>
    )}
  </div>
</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;