import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import paymentRoutes from "./routes/payment.route.js";
import appointmentRoutes from "./routes/appointment.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json({ limit: "50mb" })); // Parses incoming JSON payloads
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully🏃🏃",
    progress: "Project uder development",
    status: 200,
  });
});

app.use("/api", userRoutes); // User routes
app.use("/api", doctorRoutes); // Doctor routes
app.use("/api", appointmentRoutes); // Appointment routes
app.use("/api", paymentRoutes); // Payment routes

export default app;
