import Product from "../models/Product.js";
import defaultProducts from "../data/defaultProducts.js";

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }

    // If not found in DB, try to match against fallback default products (by numeric id or id field)
    const fallback = defaultProducts.find(
      (p) => String(p._id || p.id) === String(req.params.id)
    );

    if (fallback) {
      return res.json(fallback);
    }

    return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    // If the id is an invalid ObjectId or other error, try fallback by numeric id
    const fallback = defaultProducts.find((p) => String(p.id) === String(req.params.id));
    if (fallback) {
      return res.json(fallback);
    }

    res.status(500).json({ message: "Server error" });
  }
};

// Add product (Admin only, with image upload)
export const addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  // req.file.path contains the Cloudinary URL
  const image = req.file?.path;

  if (!image) {
    return res.status(400).json({ message: "Product image is required" });
  }

  const product = new Product({
    name,
    price,
    description,
    category,
    image
  });

  await product.save();
  res.json({ message: "Product added successfully", product });
};

// Update product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file?.path;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    if (image) product.image = image;

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
