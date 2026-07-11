import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DATABASED = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASED);
    console.log("🚀 Mongodb connection successfully!!!");
  } catch (error) {
    console.log("❌ Mongodb connection is failed...");
  }
};
