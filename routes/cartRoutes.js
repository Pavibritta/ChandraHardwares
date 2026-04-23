import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addToCart); // ✅ protected
router.get("/", authMiddleware, getCart); // ✅ protected
router.put("/", authMiddleware, updateCartItem);
router.delete("/", authMiddleware, removeCartItem);
router.delete("/clear", authMiddleware, clearCart);

export default router;
