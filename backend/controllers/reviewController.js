import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  const { productId, rating, comment } = req.body;

  // Check if user already reviewed this product
  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    product: productId
  });

  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ message: "You already reviewed this product" });
  }

  const review = new Review({
    user: req.user._id,
    product: productId,
    rating,
    comment
  });

  await review.save();
  res.json({ message: "Review added successfully" });
};

export const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.id })
    .populate("user", "name");

  res.json(reviews);
};