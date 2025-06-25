import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slot: {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "done"],
      default: "booked",
    },
    otp: {
      type: Number,
      required: true,
    },

    // payment related fields
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentInfo: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
  },
  { timestamps: true }
);

export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
export default AppointmentModel;
