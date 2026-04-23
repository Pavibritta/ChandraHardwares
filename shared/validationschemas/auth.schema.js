import { z } from "zod";
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .nonempty("Full Name is Required")
      .min(3, "Name must be in greater than three letters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Enter a Valid email"),
    password: z.string().min(6, "Minimum 6 characters required"),
    confirmPassword: z.string().min(6, "Minimum 6 characters required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, "Minimum 6 characters required"),
});
