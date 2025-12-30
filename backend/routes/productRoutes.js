import express from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // Cloudinary + Multer

const router = express.Router();

// Get all products (public)
router.get("/", getProducts);

// Get product by ID (public)
router.get("/:id", getProductById);

// Add new product (Admin only + image upload)
router.post(
  "/",
  protect,
  admin,
  upload.single("image"), // expects 'image' field from form-data
  addProduct
);

// Update product (Admin only)
router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);

// Delete product (Admin only)
router.delete("/:id", protect, admin, deleteProduct);

export default router;
