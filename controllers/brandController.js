import { brandSchema } from "../shared/validationschemas/category.schema.js";
import Brand from "../models/brand.model.js";
import cloudinary from "../config/cloudinary.js";

export const createBrand = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Brands" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(req.file.buffer);
    });

    const brand = await Brand.create({
      name: req.body.name,
      status: req.body.status,
      description: req.body.description,
      image: uploadResponse.secure_url, // ✅ THIS FIXES EVERYTHING
    });

    return res.status(201).json({
      message: "Brand created successfully",
      brand,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// get brands

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    console.log(brands);
    res.json(brands);
  } catch (error) {
    console.log("error fetching Products", error);
    res.status(500).json({ error: "failed to fetch Products" });
  }
};

//delete brand

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // ✅ Delete image from Cloudinary
    if (brand.image) {
      const publicId = brand.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`Brands/${publicId}`);
    }

    await Brand.findByIdAndDelete(id);

    res.json({ message: "Brand deleted successfully" });

  } catch (error) {
    console.log("Delete brand error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//update brand

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    let updateData = {
      name: req.body.name,
      status: req.body.status,
      description: req.body.description,
    };

    // ✅ If new image uploaded
    if (req.file) {

      // 🔥 delete old image first
      if (brand.image) {
        const publicId = brand.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`Brands/${publicId}`);
      }

      // 🔥 upload new image
      const uploadResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Brands" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.image = uploadResponse.secure_url;
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Brand updated successfully",
      brand: updatedBrand,
    });

  } catch (error) {
    console.log("Update brand error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get brand by id

export const getBrandById = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json(brand);
};