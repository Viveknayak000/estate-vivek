
// import dotenv from 'dotenv';
// import express from "express";
// import mongoose from "mongoose";
// import userRouter from "./routes/user.route.js";
// import authRouter from "./routes/auth.route.js";
// import cors from 'cors';

// dotenv.config();
// // Initialize express app
// const app = express();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// app.use(express.json());
// // Set up a basic route
// app.use("/api/user", userRouter);
// app.use("/api/auth", authRouter);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// app.use((err, req, res, next)=>{
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internet server error';
//   return res.status(statusCode).json({
//     success:false,
//     statusCode,
//     message,

//   });

// })

// app.use(cors());
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ✅ Import Routes Correctly
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import uploadRouter from "./routes/upload.route.js";

// ✅ Load .env.cloudinary
const cloudinaryEnvPath = path.resolve(process.cwd(), "./.env.cloudinary");
if (fs.existsSync(cloudinaryEnvPath)) {
  dotenv.config({ path: cloudinaryEnvPath });
  console.log("✅ Loaded .env.cloudinary");
} else {
  console.error("❌ .env.cloudinary file not found!");
}

// ✅ Load .env.mongo
const mongoEnvPath = path.resolve(process.cwd(), "../.env.mongo");
if (fs.existsSync(mongoEnvPath)) {
  dotenv.config({ path: mongoEnvPath });
  console.log("✅ Loaded .env.mongo");
} else {
  console.error("❌ .env.mongo file not found!");
}

// ✅ Check if variables are loaded
console.log("MongoDB URI:", process.env.MONGO_URL || "❌ MISSING");
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "❌ MISSING",
  api_key: process.env.CLOUDINARY_API_KEY ? "Exists" : "❌ MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "Exists" : "❌ MISSING",
});

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ✅ Define Express App
const app = express();

// ✅ Use CORS middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error));

// ✅ Define routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api", uploadRouter);

// ✅ Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

