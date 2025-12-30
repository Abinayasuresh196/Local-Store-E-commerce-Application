import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatus
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", protect, admin, getDashboardStats);

// Users
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);

// Orders
router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id", protect, admin, updateOrderStatus);

export default router;
