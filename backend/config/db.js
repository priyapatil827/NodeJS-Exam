import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/NodeJSExam");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection error: ", err);
  }
};
