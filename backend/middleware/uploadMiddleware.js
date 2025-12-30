import multer from "multer";
import { storage } from "../config/cloudinary.js";

// Multer middleware for Cloudinary
const upload = multer({ storage });

export default upload;
