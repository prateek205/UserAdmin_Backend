import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/UserRoute.js";

// DOTENV CONFIG
dotenv.config();
connectDB();
const PORT = process.env.SERVER_PORT;
// const ADMIN_PORT = process.env.ADMIN_SIDE_PORT;
const RENDER_ADMIN_URL = process.env.RENDER_URL;

const app = express();
// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: RENDER_ADMIN_URL,
  }),
);

// ROUTER
app.use("/api/v1/employee", userRoute);

// SERVER IS RUNNING
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
