import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrdersByUser,
  cancelOrder,
  updateOrderStatus
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder); // ✅ protected
router.get("/", authMiddleware, getAllOrders);

// ✅ get orders by user id
router.get("/:userId", authMiddleware, getOrdersByUser);

// ✅ cancel order
router.put("/:id", authMiddleware, cancelOrder);
router.put("/update/:id", authMiddleware, updateOrderStatus);

export default router;
