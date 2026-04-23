import express from "express";
import { createBrand, getBrands,updateBrand,deleteBrand,getBrandById } from "../controllers/brandController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createBrand);
router.get("/", getBrands);
router.put("/:id", upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrandById);
export default router;
