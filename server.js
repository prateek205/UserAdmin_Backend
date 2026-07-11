import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// DOTENV CONFIG
dotenv.config();
connectDB()
const PORT = process.env.SERVER_PORT;

const app = express();
// MIDDLEWARE
app.use(express.json());
app.use(cors());

// SERVER IS RUNNING
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
