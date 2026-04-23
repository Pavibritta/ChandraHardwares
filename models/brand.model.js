import mongoose from "mongoose";
import { string } from "zod";

const brandSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Brand", brandSchema);
