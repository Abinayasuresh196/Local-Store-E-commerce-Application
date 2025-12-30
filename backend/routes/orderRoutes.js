import express from "express";
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private (user)
router.post("/", protect, createOrder);

// @route   GET /api/orders/my
// @desc    Get logged-in user's orders
// @access  Private (user)
router.get("/my", protect, getMyOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private (user)
router.get("/:id", protect, getOrderById);

export default router;
