
import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js"

dotenv.config();
// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Set up a basic route
app.use("/api/user", userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

