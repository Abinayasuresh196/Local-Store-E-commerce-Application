import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Dashboard statistics
export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();

  res.json({
    users,
    products,
    orders
  });
};

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Delete user
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// Get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email");
  res.json(orders);
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = req.body.status;
  await order.save();

  res.json({ message: "Order status updated" });
};
