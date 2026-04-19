"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const AddToCart = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Luminous Zelio+ 1100 Home Inverter",
      brand: "Luminous",
      price: 6500,
      qty: 1,
      image: "/Switches.jpg",
    },
  ]);

  // ✅ Increase quantity
  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ✅ Decrease quantity
  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // ✅ Remove item
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Calculate totals
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const delivery = 100;
  const total = subTotal + delivery;

  // ✅ Navigate to Orders page
  const handleOrder = () => {
    router.push("/orders");
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-secondary mt-24">
        Your Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto my-10 px-4">
        {/* 🛒 Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 bg-white p-5 rounded-xl shadow relative hover:shadow-lg transition"
              >
                <X
                  onClick={() => removeItem(item.id)}
                  className="absolute right-4 top-4 text-red-500 cursor-pointer"
                  size={20}
                />

                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />

                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      Brand: {item.brand}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 border px-3 py-1 rounded-lg">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="text-lg font-bold"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="text-lg font-bold"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold text-primary">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 💳 Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-secondary mb-6 text-center">
            Order Summary
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg text-primary">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            className="w-full mt-6 bg-secondary text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Order Now →
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToCart;