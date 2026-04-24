"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ShoppingBag, Trash2, Plus, Minus, Truck, Shield, CreditCard, ArrowLeft, MapPin, Phone, User, Home, Building, Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "app/context/AuthContext";


// Types
type CartItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    stock: number;
    description?: string;
  };
  quantity: number;
};

type AddressData = {
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
};

const AddToCart = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Address Modal States
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressData, setAddressData] = useState<AddressData>({
    name: user?.name || "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [addressErrors, setAddressErrors] = useState<Partial<AddressData>>({});
  const [submittingOrder, setSubmittingOrder] = useState(false);

  
  // ✅ Fetch cart from API
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
     

      const response = await fetch("/api/cart",  {
  method: "GET",
  credentials: "include", // 👈 VERY IMPORTANT
});
      
      if (!response.ok) throw new Error("Failed to fetch cart");
      
      const data = await response.json();
      console.log("Cart data:", data);
      
      setCartItems(data.items || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load your cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
   try {
    setUpdating(itemId);

    const res = await fetch("/api/cart", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, quantity }),
    });

    if (!res.ok) throw new Error("Update failed");

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  } catch (err) {
    console.log(err);
  } finally {
    setUpdating(null);
  }
  };

  // ✅ Remove item from cart
  const removeItem = async (itemId:string) => {
  try {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    if (!res.ok) throw new Error("Delete failed");

    setCartItems((prev) => prev.filter((i) => i._id !== itemId));
  } catch (err) {
    console.log(err);
  }
};

  // ✅ Clear entire cart
  const clearCart = async () => {
  const res = await fetch("/api/cart/clear", {
    method: "DELETE",
    credentials: "include",
  });

  if (res.ok) setCartItems([]);
};

  // ✅ Calculate totals
  const subTotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  const delivery = subTotal > 500 ? 0 : 100;
  const tax = subTotal * 0.05; // 5% tax
  const total = subTotal + delivery + tax;

  // ✅ Validate address form
  const validateAddress = (): boolean => {
    const errors: Partial<AddressData> = {};
    
    if (!addressData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!addressData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(addressData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    
    if (!addressData.addressLine.trim()) {
      errors.addressLine = "Address is required";
    }
    
    if (!addressData.city.trim()) {
      errors.city = "City is required";
    }
    
    if (!addressData.state.trim()) {
      errors.state = "State is required";
    }
    
    if (!addressData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(addressData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ✅ Handle address input changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (addressErrors[name as keyof AddressData]) {
      setAddressErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // ✅ Submit order with address
  const handlePlaceOrder = async () => {
  if (!validateAddress()) return;

  try {
    setSubmittingOrder(true);

    // ✅ Save address
    const addressRes = await fetch("/api/address", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressData),
    });

    const savedAddress = await addressRes.json();

    if (!savedAddress._id) {
      throw new Error("Address not saved properly");
    }

    // ✅ FIXED ITEMS FORMAT
    const formattedItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // ✅ Create order
    const orderRes = await fetch("/api/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addressId: savedAddress._id,
        paymentMethod: "COD",
        items: formattedItems, // ✅ FIXED
        total,
      }),
    });

    const order = await orderRes.json();
    console.log("Order response:", order);

    if (!orderRes.ok) {
      throw new Error(order.message || "Order failed");
    }

    router.push("/orders");

  } catch (err) {
    console.log(err);
    setError("Order failed");
  } finally {
    setSubmittingOrder(false);
  }
};
  // ✅ Open checkout modal
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }
    setShowAddressModal(true);
  };

  // Rest of your component remains the same...
  if (loading) {
    return (
      <div className="min-h-[800px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-20 mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4 cursor-pointer"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-secondary flex items-center gap-10 ">
              <ShoppingBag className="text-primary" size={20} />
              Your Shopping Cart
            </h1>
            <p className="text-gray-600 mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="text-gray-400 text-8xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg mb-4 mt-4">Your cart is empty</p>
              <button
                onClick={() => router.push("/shop")}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                <ShoppingBag size={18} />
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Clear Cart
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6 relative group"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.product?.image || "/placeholder.jpg"}
                          alt={item.product?.name || "Product"}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 640px) 100vw, 128px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="font-semibold text-lg text-secondary hover:text-primary transition-colors line-clamp-1">
                              {item.product?.name}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                              Brand: {item.product?.brand}
                            </p>
                            {item.product?.description && (
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {item.product.description}
                              </p>
                            )}
                          </div>
                          
                          {/* Desktop Remove Button */}
                          <button
                            onClick={() => removeItem(item._id)}
                            disabled={updating === item._id}
                            className="hidden sm:block text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <div className="flex flex-wrap justify-between items-end mt-4 gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2 border rounded-lg px-2 py-1 bg-gray-50">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                disabled={updating === item._id || item.quantity <= 1}
                                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                disabled={updating === item._id || item.quantity >= (item.product?.stock || 0)}
                                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            {updating === item._id && (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-2xl text-primary">
                              ₹{(item.product?.price || 0) * item.quantity}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500">
                                ₹{item.product?.price} each
                              </p>
                            )}
                          </div>

                          {/* Mobile Remove Button */}
                          <button
                            onClick={() => removeItem(item._id)}
                            disabled={updating === item._id}
                            className="sm:hidden text-red-500 text-sm flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-secondary mb-6 pb-3 border-b">
                    Order Summary
                  </h2>

                  <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{subTotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <div>
                        {delivery === 0 ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          <span className="font-medium">₹{delivery}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax (GST 5%)</span>
                      <span className="font-medium">₹{tax.toLocaleString()}</span>
                    </div>

                    <hr className="my-2" />

                    <div className="flex justify-between font-bold text-xl text-primary">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>

                    <div className="text-xs text-gray-500 mt-2 space-y-1">
                      <p className="flex items-center gap-1">
                        <Shield size={12} />
                        Safe and secure payments
                      </p>
                      <p className="flex items-center gap-1">
                        <CreditCard size={12} />
                        100% money-back guarantee
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Proceed to Checkout →
                  </button>

                  <button
                    onClick={() => router.push("/shop")}
                    className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Savings Info */}
                {subTotal > 0 && subTotal < 500 && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-medium mb-2">💡 You're saving:</p>
                    <p className="text-xs text-blue-600">
                      Add items worth ₹{500 - subTotal} more to get free delivery!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary" size={24} />
                <h2 className="text-2xl font-bold text-secondary">Delivery Address</h2>
              </div>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={addressData.name}
                    onChange={handleAddressChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      addressErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {addressErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={addressData.phone}
                    onChange={handleAddressChange}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      addressErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {addressErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.phone}</p>
                  )}
                </div>

                {/* Address Line */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home size={16} className="inline mr-2" />
                    Address *
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={addressData.addressLine}
                    onChange={handleAddressChange}
                    placeholder="House number, street, area"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      addressErrors.addressLine ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {addressErrors.addressLine && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.addressLine}</p>
                  )}
                </div>

                {/* City, State, Pincode Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building size={16} className="inline mr-2" />
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={addressData.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        addressErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {addressErrors.city && (
                      <p className="text-red-500 text-xs mt-1">{addressErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Map size={16} className="inline mr-2" />
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={addressData.state}
                      onChange={handleAddressChange}
                      placeholder="State"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        addressErrors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {addressErrors.state && (
                      <p className="text-red-500 text-xs mt-1">{addressErrors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={addressData.pincode}
                      onChange={handleAddressChange}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        addressErrors.pincode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {addressErrors.pincode && (
                      <p className="text-red-500 text-xs mt-1">{addressErrors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary in Modal */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST 5%):</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total to Pay:</span>
                      <span className="text-primary">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={submittingOrder}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingOrder ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Placing Order</span>
                    </div>
                  ) : (
                    'Place Order ✓'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;