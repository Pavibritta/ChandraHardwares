import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  address: {
    name: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
  },
  totalAmount: Number,
  paymentMethod: {
    type: String,
    default: "COD", // 👈 cash on delivery
  },
  status: {
    type: String,
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);