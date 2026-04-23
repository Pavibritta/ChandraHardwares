import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import { productSchema } from "../shared/validationschemas/category.schema.js";

export const createProduct = async (req, res) => {
  try {
    const parsedData = {
      ...req.body,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
    };

    const result = productSchema.safeParse(parsedData);

    if (!result.success) {
      console.log(result.error); // 👈 ADD THIS
      return res.status(400).json({ error: result.error.errors });
    }
    console.log(result);

    if (!req.file) {
      return res.status(400).json({
        error: "Image is required",
      });
    }

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });
    const { name, categoryId, brand, stock, price, description } = result.data;
    const product = await Product.create({
      name,
      category: categoryId,
      brand,
      stock,
      price,
      description,
      image: response.secure_url,
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // ✅ important
    res.json(products);
  } catch (error) {
    console.log("error fetching Products", error);
    res.status(500).json({ error: "failed to fetch Products" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ delete image from cloudinary
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update products

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = {
      name: req.body.name,
      category: req.body.categoryId,
      brand: req.body.brand,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
      description: req.body.description,
    };

    if (req.file) {
      const response = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      updateData.image = response.secure_url;
    }

    console.log("UPDATE DATA:", updateData);

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Updated", product });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

//get product by id

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.log("Get product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
