import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
