import express from "express"
import { saveAddress,getAddress } from "../controllers/addressController.js"
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, saveAddress); // ✅ protected
router.get("/", authMiddleware, getAddress); // ✅ protected

export default router;