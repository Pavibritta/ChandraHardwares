import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Category name is required"),
});

export const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().min(3, "Brand is required"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  description: z
    .string()
    .trim()
    .min(1, "Product description is required")
    .max(500, "Max 500 characters allowed"),
});

export const brandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(1, "Description is required"),
});
