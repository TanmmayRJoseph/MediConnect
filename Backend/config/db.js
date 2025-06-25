import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
const connectDB = async () => {
  // Check if MONGO_DB_URI is defined
  if (!process.env.MONGO_DB_URI) {
    throw new Error("MONGO_DB_URI is not defined in the environment variables");
  }

  const state = mongoose.connection.readyState;

  if (state === 1) {
    // Database is already connected
    console.log("Database already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log("Database connected successfully");

    // Event listeners for connection state changes
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
