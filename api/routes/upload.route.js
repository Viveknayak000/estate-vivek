import express from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import upload from "../multer.js";  // Ensure multer is correctly imported

dotenv.config();

const router = express.Router();

// ✅ Ensure Cloudinary is configured correctly
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// ✅ Fix the Upload Route: Add `upload.single("file")`
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("Received File:", req.file); // Debugging log

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // ✅ Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });

    // ✅ Delete the local file after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting local file:", err);
    });

    res.json({ success: true, imageUrl: cloudinaryResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

