import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Product", productSchema);
