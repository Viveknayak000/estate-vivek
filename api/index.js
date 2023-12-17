import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// mongoose.connect(process.env.MONGO).then(() => {
//   console.log('connected to mongoDB!');
// }).catch(err)

mongoose.connect =("mongodb+srv://viveknayak8258:Vector%401437@estate-vivek.3khoqkm.mongodb.net/?retryWrites=true&w=majority")

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
    }

)
