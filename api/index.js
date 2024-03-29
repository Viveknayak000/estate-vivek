
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

import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Use CORS middleware with permissive configuration
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

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

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });

});
