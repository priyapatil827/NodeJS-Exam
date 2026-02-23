import express from "express";
import multer from "multer";
import path from "path";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productControllers.js";

const productRouter = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder must exist
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Add product route with file upload
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/update/:id", upload.single("image"), updateProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;