import { razorpay } from "../services/razorpay.service.js";
import AppointmentModel from "../models/appointment.model.js";



export const createPaymentOrder = async (req, res) => {
  try {
    const { appointmentId, fees } = req.body;

    if (!appointmentId || !fees) {
      return res.status(400).json({ message: "Missing appointmentId or fees" });
    }

    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const amountInPaise = fees * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${appointmentId}`,
    };

    const order = await razorpay.orders.create(options);

    // ✅ Save orderId to DB
    appointment.paymentInfo = {
      orderId: order.id,
    };
    appointment.paymentStatus = "pending";
    await appointment.save();

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Payment Order Error:", err);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};


export const verifyPayment = async (req, res) => {
    try {
      const { appointmentId, orderId, paymentId, signature } = req.body;
  
      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");
  
      if (generatedSignature !== signature) {
        return res.status(400).json({ message: "Invalid signature" });
      }
  
      const appointment = await AppointmentModel.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      appointment.paymentStatus = "paid";
      appointment.paymentInfo = {
        orderId,
        paymentId,
        signature,
      };
  
      await appointment.save();
  
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } catch (err) {
      console.error("Payment Verification Error:", err);
      res.status(500).json({ message: "Payment verification failed" });
    }
  };
