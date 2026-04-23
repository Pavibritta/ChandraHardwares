import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  loginSchema,
  signupSchema,
} from "../shared/validationschemas/auth.schema.js";

export const defaultAdmin = async () => {
  try {
    const isAdminExists = await User.findOne({ email: "admin@gmail.com" });
    if (!isAdminExists) {
      const hashedPassword = bcrypt.hashSync("admin123", 10);
      await User.create({
        fullName: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

// get users

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log("error fetching users", error);
    res.status(500).json({ error: "failed to fetch users" });
  }
};
//register users

export const register = async (req, res) => {
  console.log(req.body);
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }
  const { fullName, email, password, role } = result.data;
  console.log(fullName, email, password);

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }
    await User.create({
      fullName,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role || "user",
    });
    res.json({
      message: `The ${fullName} is registered successfully !`,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

//login user

export const login = async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }
  const { email, password } = result.data;

  try {
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) return res.status(404).json({ error: "user not found" });
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    res.json({
      message: `User ${user.fullName} logged in successfully`,
      token,
      user: {
        _id: user._id, // ✅ ADD THIS
        name: user.fullName,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ error: "Failed to login user", errorMessage: error.message });
  }
};
//logout

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
