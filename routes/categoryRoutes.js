import express from "express";
import {
  createCategory,
  deleteCategories,
  getCategories,
  getCategoryById,
  updateCategory
} from "../controllers/categoryController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategories);
router.get("/:id", getCategoryById);
router.put("/:id", upload.single("image"), updateCategory);
export default router;
