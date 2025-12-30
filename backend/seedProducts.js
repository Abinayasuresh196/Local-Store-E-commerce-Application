import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing products
    await Product.deleteMany();
    console.log("Cleared existing products");

    // Default products
    const products = [
  { name: "Smartphone X1", category: "Electronics", price: 499, image: "/images/product1.jpg", description: "Latest smartphone with advanced features and sleek design." },
  { name: "Laptop Pro 15", category: "Electronics", price: 1199, image: "/images/product2.jpg", description: "High-performance laptop for professionals and creative work." },
  { name: "Wireless Earbuds", category: "Electronics", price: 99, image: "/images/product3.jpg", description: "Premium wireless earbuds with noise cancellation and long battery life." },
  { name: "Smartwatch Series 5", category: "Electronics", price: 299, image: "/images/product4.jpg", description: "Advanced fitness and health tracking smartwatch with notifications." },
  { name: "Bluetooth Speaker", category: "Electronics", price: 79, image: "/images/product5.jpg", description: "Portable Bluetooth speaker delivering excellent sound quality on the go." },
  { name: "Gaming Console Z", category: "Electronics", price: 399, image: "/images/product6.jpg", description: "Next-generation gaming console with immersive graphics and performance." },
  { name: "DSLR Camera 2000", category: "Electronics", price: 899, image: "/images/product7.jpg", description: "Professional DSLR camera with high-resolution imaging and multiple lens options." },
  { name: "4K LED TV 50\"", category: "Electronics", price: 699, image: "/images/product8.jpg", description: "Ultra HD 4K LED TV with vibrant colors and smart features." },
  { name: "Noise Cancelling Headphones", category: "Electronics", price: 199, image: "/images/product9.jpg", description: "Over-ear headphones with active noise cancellation and superior sound." },
  { name: "Tablet Plus", category: "Electronics", price: 499, image: "/images/product10.jpg", description: "Lightweight tablet for work, study, and entertainment with high-resolution display." },
  { name: "Women Summer Dress", category: "Fashion", price: 59, image: "/images/product11.jpg", description: "Comfortable and stylish summer dress perfect for casual outings." },
  { name: "Men Casual Shirt", category: "Fashion", price: 39, image: "/images/product12.jpg", description: "Classic casual shirt for men, suitable for daily wear and semi-formal events." },
  { name: "Hoodie Unisex", category: "Fashion", price: 49, image: "/images/product13.jpg", description: "Cozy and versatile hoodie designed for both men and women." },
  { name: "Leather Jacket", category: "Fashion", price: 129, image: "/images/product14.jpg", description: "Stylish leather jacket offering durability and a premium look." },
  { name: "Sneakers Classic", category: "Fashion", price: 69, image: "/images/product15.jpg", description: "Comfortable and fashionable sneakers suitable for everyday wear." },
  { name: "Denim Jeans", category: "Fashion", price: 49, image: "/images/product16.jpg", description: "Classic denim jeans with a perfect fit for casual occasions." },
  { name: "Women Handbag", category: "Fashion", price: 79, image: "/images/product17.jpg", description: "Elegant handbag with ample space for daily essentials." },
  { name: "Sunglasses UV", category: "Fashion", price: 29, image: "/images/product18.jpg", description: "Stylish sunglasses providing full UV protection for sunny days." },
  { name: "Men Formal Suit", category: "Fashion", price: 199, image: "/images/product19.jpg", description: "Premium formal suit perfect for office meetings and special events." },
  { name: "Summer Sandals", category: "Fashion", price: 35, image: "/images/product20.jpg", description: "Comfortable summer sandals for men and women, ideal for outdoor wear." },
  { name: "Running Shoes", category: "Shoes", price: 59, image: "/images/product21.jpg", description: "Lightweight running shoes with excellent grip and cushioning." },
  { name: "Sports Sneakers", category: "Shoes", price: 69, image: "/images/product22.jpg", description: "Versatile sports sneakers for gym workouts and outdoor activities." },
  { name: "Casual Loafers", category: "Shoes", price: 49, image: "/images/product23.jpg", description: "Comfortable loafers ideal for casual and semi-formal use." },
  { name: "Women High Heels", category: "Shoes", price: 79, image: "/images/product24.jpg", description: "Elegant high heels for women, perfect for parties and formal occasions." },
  { name: "Backpack Travel", category: "Shoes", price: 39, image: "/images/product25.jpg", description: "Durable travel backpack with multiple compartments for convenience." },
  { name: "Leather Belt", category: "Shoes", price: 25, image: "/images/product26.jpg", description: "Classic leather belt suitable for casual and formal wear." },
  { name: "Watch Classic", category: "Shoes", price: 99, image: "/images/product27.jpg", description: "Timeless classic watch with elegant design and reliable movement." },
  { name: "Gym Bag", category: "Shoes", price: 45, image: "/images/product28.jpg", description: "Spacious gym bag to carry all your workout essentials." },
  { name: "Baseball Cap", category: "Shoes", price: 15, image: "/images/product29.jpg", description: "Adjustable baseball cap for casual outdoor wear and sun protection." },
  { name: "Sports Socks Pack", category: "Shoes", price: 12, image: "/images/product30.jpg", description: "Comfortable and breathable sports socks, sold in a convenient pack." },
  { name: "Air Fryer 5L", category: "Home", price: 129, image: "/images/product31.jpg", description: "Efficient 5L air fryer for healthy cooking with less oil." },
  { name: "Blender Pro", category: "Home", price: 89, image: "/images/product32.jpg", description: "High-powered blender for smoothies, soups, and sauces." },
  { name: "Non-stick Cookware Set", category: "Home", price: 99, image: "/images/product33.jpg", description: "Durable non-stick cookware set for easy and healthy cooking." },
  { name: "Vacuum Cleaner", category: "Home", price: 149, image: "/images/product34.jpg", description: "Powerful vacuum cleaner to keep your home clean effortlessly." },
  { name: "Coffee Maker", category: "Home", price: 79, image: "/images/product35.jpg", description: "Convenient coffee maker for fresh and delicious coffee at home." },
  { name: "Organic Olive Oil", category: "Grocery", price: 19, image: "/images/product36.jpg", description: "Premium organic olive oil for healthy cooking and salads." },
  { name: "Premium Rice 5kg", category: "Grocery", price: 25, image: "/images/product37.jpg", description: "High-quality premium rice with perfect texture and flavor." },
  { name: "Pack of Spices", category: "Grocery", price: 15, image: "/images/product38.jpg", description: "Assorted spice pack to enhance the flavor of your meals." },
  { name: "Fruit Basket Set", category: "Grocery", price: 29, image: "/images/product39.jpg", description: "Fresh fruit basket containing seasonal fruits, perfect for gifting." },
  { name: "LED Desk Lamp", category: "Home", price: 35, image: "/images/product40.jpg", description: "Energy-efficient LED desk lamp with adjustable brightness." },
  { name: "Yoga Mat", category: "Sports", price: 25, image: "/images/product41.jpg", description: "Comfortable yoga mat for exercise, meditation, and stretching." },
  { name: "Dumbbell Set 10kg", category: "Sports", price: 49, image: "/images/product42.jpg", description: "Durable dumbbell set for strength training at home." },
  { name: "Treadmill Home", category: "Sports", price: 399, image: "/images/product43.jpg", description: "Compact treadmill for home workouts and cardio training." },
  { name: "Exercise Bike", category: "Sports", price: 299, image: "/images/product44.jpg", description: "Stationary exercise bike for indoor cycling and fitness." },
  { name: "Resistance Bands Set", category: "Sports", price: 19, image: "/images/product45.jpg", description: "Set of resistance bands for strength training and rehabilitation exercises." },
  { name: "Notebook Set 3pcs", category: "Books", price: 9, image: "/images/product46.jpg", description: "Set of three notebooks suitable for school, office, or personal use." },
  { name: "Coloring Book", category: "Books", price: 5, image: "/images/product47.jpg", description: "Fun and creative coloring book for kids and adults." },
  { name: "Classic Novel", category: "Books", price: 15, image: "/images/product48.jpg", description: "Timeless classic novel to enjoy reading and literature." },
  { name: "Ballpoint Pen Pack", category: "Books", price: 7, image: "/images/product49.jpg", description: "Smooth-writing ballpoint pen pack for daily writing needs." },
  { name: "Planner 2025", category: "Books", price: 12, image: "/images/product50.jpg", description: "Organize your year with this 2025 planner featuring daily and monthly layouts." }
];


    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
