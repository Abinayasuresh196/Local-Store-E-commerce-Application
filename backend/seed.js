import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "abinaya@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit();
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      name: "Admin User",
      email: "abinaya@gmail.com",
      password: hashedPassword,
      isAdmin: true
    });

    console.log("Admin user created successfully:");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: admin123`);
    console.log(`Admin: ${admin.isAdmin}`);

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
