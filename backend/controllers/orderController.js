import Order from "../models/Order.js";
import Product from "../models/Product.js";
import sendEmail from "../utils/sendEmail.js";

// Create a new order
export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  // Send order confirmation email
  try {
    const orderItemsHtml = orderItems.map(item => 
      `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.quantity * item.price).toFixed(2)}</td>
      </tr>`
    ).join('');

    await sendEmail({
      to: req.user.email,
      subject: `Order Confirmation #${createdOrder._id}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order! Here are the details:</p>
        
        <h3>Order #${createdOrder._id}</h3>
        <p><strong>Status:</strong> ${createdOrder.status}</p>
        
        <h4>Shipping Address:</h4>
        <p>
          ${shippingAddress.address}<br>
          ${shippingAddress.city}, ${shippingAddress.postalCode}<br>
          ${shippingAddress.country}
        </p>
        
        <h4>Order Items:</h4>
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
        </table>
        
        <h4>Order Summary:</h4>
        <p>
          Items: $${itemsPrice.toFixed(2)}<br>
          Tax: $${taxPrice.toFixed(2)}<br>
          Shipping: $${shippingPrice.toFixed(2)}<br>
          <strong>Total: $${totalPrice.toFixed(2)}</strong>
        </p>
        
        <p>We'll notify you when your order ships.</p>
        <br>
        <p>The Local Store Team</p>
      `
    });
  } catch (emailError) {
    console.error("Order confirmation email failed to send:", emailError.message);
  }

  res.status(201).json(createdOrder);
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Check if user owns the order or is admin
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// (Optional) Admin - get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "id name email").sort({ createdAt: -1 });
  res.json(orders);
};

// (Optional) Admin - update order status
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = req.body.status || order.status;
  const updatedOrder = await order.save();
  res.json(updatedOrder);
};
