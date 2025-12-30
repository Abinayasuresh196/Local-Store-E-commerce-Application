import express from "express";
import {
  addReview,
  getProductReviews
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add review (logged-in users only)
router.post("/", protect, addReview);

// Get reviews for a product
router.get("/:id", getProductReviews);

export default router;
