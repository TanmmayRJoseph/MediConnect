import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/payments.controller.js";
import { authMiddleware } from "../middlewares/authRoles.js";

const router = express.Router();

router.post("/payment", authMiddleware, createPaymentOrder);
router.post("/verify", authMiddleware, verifyPayment);

export default router;