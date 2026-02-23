import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
