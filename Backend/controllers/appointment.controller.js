import AppointmentModel from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";

import "../models/doctor.model.js"; // ✅ Force-register Doctor model (needed for populate)
import "../models/user.model.js";

function generateOTP(num) {
  function generateOtp(num) {
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num);
    return Math.floor(Math.random() * (max - min) + min).toString();
  }
  return generateOtp(num);
}

export const bookAppointmentController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const patientId = req.user._id;
    const role = req.user.role;

    if (role !== "patient") {
      return res.status(403).json({
        message: "Access denied. Only patients can book appointments.",
      });
    }

    const { doctorId, slot } = req.body;

    if (!doctorId || !slot?.date || !slot?.time) {
      return res
        .status(400)
        .json({ message: "Doctor ID, date, and time are required." });
    }

    // ✅ Ensure doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    const newAppointment = new AppointmentModel({
      doctorId,
      patientId,
      slot,
      otp: Number(generateOTP(6)),
    });

    await newAppointment.save();

    // ✅ Deep populate
    const populatedAppointment = await AppointmentModel.findById(
      newAppointment._id
    )
      .populate({
        path: "doctorId",
        select: "-__v -availableSlots",
        populate: {
          path: "userId",
          model: "User",
          select: "name email profilePic role",
        },
      })
      .populate("patientId", "name email profilePic role");

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populatedAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getMyAppointmentsController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const role = req.user.role;
    const patientId = req.user._id;

    if (role !== "patient") {
      return res.status(403).json({
        message: "Access denied. Only patients can get their appointments.",
      });
    }

    const appointments = await AppointmentModel.find({ patientId })
      .populate({
        path: "doctorId",
        select: "-__v -availableSlots",
        populate: {
          path: "userId",
          model: "User",
          select: "name email profilePic role",
        },
      })
      .populate("patientId", "name email profilePic role");

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllAppointmentsForDoctorController = async (req, res) => {
  try {
    // ✅ Step 1: Find the doctor's _id using the user._id
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // ✅ Step 2: Use doctor._id to find appointments
    const appointments = await AppointmentModel.find({
      doctorId: doctor._id,
    })
      .populate({
        path: "doctorId",
        select: "-__v -availableSlots",
        populate: {
          path: "userId",
          model: "User",
          select: "name email profilePic role",
        },
      })
      .populate("patientId", "name email profilePic role");

    res.status(200).json({ appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in getting appointments" });
  }
};

export const updateAppointmentStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp, action } = req.body;

    if (!otp || !action) {
      return res.status(400).json({ message: "OTP and action are required" });
    }

    const numericOtp = Number(otp);

    const appointment = await AppointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.otp !== numericOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (appointment.otp === undefined) {
      return res
        .status(500)
        .json({ message: "Appointment OTP not found in DB" });
    }
    if (appointment.status === "cancelled") {
      return res
        .status(409)
        .json({ message: "Appointment has already been cancelled" });
    }

    if (appointment.status === "done" && action === "confirm") {
      return res
        .status(409)
        .json({ message: "Appointment is already completed" });
    }

    if (action === "done") {
      appointment.status = "done";
    } else if (action === "cancel") {
      appointment.status = "cancelled";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await appointment.save();

    res.status(200).json({
      message: `Congratulations! You have successfully ${action} the appointment.`,
    });
  } catch (error) {
    console.error("❌ Error updating appointment status:", error);
    res.status(500).json({
      message: "Error updating appointment status. Please try again.",
    });
  }
};
