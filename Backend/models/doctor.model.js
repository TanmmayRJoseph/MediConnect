import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: {
    type: String, // e.g., '2025-06-22'
    required: true,
  },
  time: {
    type: String, // e.g., '10:00 AM'
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const doctorSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    fees: {
      type: Number,
      required: [true, "Consultation fee is required"],
    },
    availableSlots: [slotSchema],
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default Doctor;
