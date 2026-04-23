import Category from "../models/category.model.js";
import cloudinary from "../config/cloudinary.js";
import { categorySchema } from "../shared/validationschemas/category.schema.js";

export const createCategory = async (req, res) => {
  try {
    const result = categorySchema.safeParse(req.body);
    console.log(result);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { name } = result.data;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "categories" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    const category = await Category.create({
      name,
      image: uploadResult.secure_url,
    });

    res.status(201).json(category);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    console.log("error fetching Categories", error);
    res.status(500).json({ error: "failed to fetch Categories" });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let updateData = {
      name: req.body.name,
    };

    // ✅ If new image uploaded
    if (req.file) {
      // 🔥 delete old image using public_id
      if (category.imagePublicId) {
        await cloudinary.uploader.destroy(category.imagePublicId);
      }

      // 🔥 upload new image
      const uploadResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });

      updateData.image = uploadResponse.secure_url;
      updateData.imagePublicId = uploadResponse.public_id; // ✅ store new id
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.log("Update category error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get category by id

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category" });
  }
};
