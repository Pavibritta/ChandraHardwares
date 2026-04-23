import express from "express";
import cors from "cors";
import "./utils/loadEnvironment.js";
import "./db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { z } from "zod";
import {
  loginSchema,
  signupSchema,
} from "./shared/validationschemas/auth.schema.js";
import User from "./models/user.model.js";
import { defaultAdmin } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://chandra-hardwares-d145n0ojh-pavibrittas-projects.vercel.app", // 🔥 replace this
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use("/", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/brands", brandRoutes);
app.use("/cart", cartRoutes);
app.use("/address", addressRoutes);
app.use("/orders", orderRoutes);
app.use("/dashboard", dashboardRoutes);
app.listen(PORT, async () => {
  console.log(`The Server is running at port http://localhost:${PORT}`);
  await defaultAdmin();
});
