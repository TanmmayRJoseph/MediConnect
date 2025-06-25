import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import cloudinary from "../services/cloudinary.service.js";
import AppointmentModel from "../models/appointment.model.js";

export const createDoctorController = async (req, res) => {
  try {
    console.log("📦 Doctor creation request body:", req.body);
    console.log("👤 Authenticated user:", req.user);

    const { specialty, bio, location, fees, availableSlots, profilePic } =
      req.body;

    // 1. Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({
      userId: req.user._id,
    }).populate("userId", "-password -__v");
    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor profile already exists.",
      });
    }

    // 2. Validate all required fields
    if (
      !profilePic ||
      !specialty?.trim() ||
      !bio?.trim() ||
      !location?.trim() ||
      fees === undefined ||
      isNaN(fees) ||
      !Array.isArray(availableSlots) ||
      availableSlots.length === 0
    ) {
      return res.status(400).json({
        message: "All fields are required and must be valid.",
      });
    }
    const uploadResult = await cloudinary.uploader.upload(profilePic);
    const uploadImageUrl = uploadResult.secure_url;
    // 3. Create the doctor profile
    const doctor = await Doctor.create({
      profilePic: uploadImageUrl,
      userId: req.user._id,
      specialty: specialty.trim(),
      bio: bio.trim(),
      location: location.trim(),
      fees: Number(fees),
      availableSlots,
    });

    // 4. Update the user's role to 'doctor' and populate the user document with doctor details
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { role: "doctor" },
      { new: true }
    );

    // 5. Return success response
    return res.status(201).json({
      message: "Doctor profile created successfully. Role updated to doctor.",
      doctor,
    });
  } catch (error) {
    console.error("❌ Error in createDoctorController:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getDoctorsController = async (req, res) => {
  try {
    const { specialty, location, name, page = 1, limit = 10 } = req.query;

    const query = {};
    if (specialty) query.specialty = specialty;
    if (location) query.location = location;
    if (name) query.name = new RegExp(name, "i"); // case-insensitive partial match

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate({
        path: "userId",
        select: "-password",
      });

    const totalDoctors = await Doctor.countDocuments(query);

    res.status(200).json({
      total: totalDoctors,
      page: parseInt(page),
      limit: parseInt(limit),
      doctors,
    });
  } catch (err) {
    console.error("❌ Error in getDoctorsController:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate({
      path: "userId",
      strictPopulate: false,
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteDoctorByIdController = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateAvailabilityController = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.availableSlots = req.body.availableSlots;
    await doctor.save();
    res
      .status(200)
      .json({ message: "Availability updated successfully", doctor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateDoctorPicController = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload the profile picture to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(profilePic);

    // Update the user's profile picture in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResult.secure_url },
      { new: true }
    );
    console.log("Cloudinary URL saved:", uploadResult.secure_url);

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const getDoctorAppointmentStats = async (req, res) => {
  try {
    // Extract doctorId from the token
    const doctorId = req.user._id;
    if (!doctorId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Forbidden access." });
    }

    // Fetch all appointments for the doctor
    const appointments = await AppointmentModel.find({ doctorId });

    // Calculate the statistics
    const totalAppointments = appointments.length;
    const upcoming = appointments.filter(
      (app) => app.status === "booked"
    ).length;
    const completed = appointments.filter(
      (app) => app.status === "done"
    ).length;
    const cancelled = appointments.filter(
      (app) => app.status === "cancelled"
    ).length;

    // Return the statistics
    res.status(200).json({
      totalAppointments,
      upcoming,
      completed,
      cancelled,
    });
  } catch (error) {
    console.error("Error fetching appointment stats:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
