import express from "express";
import {
  bookAppointmentController,
  getMyAppointmentsController,
  getAllAppointmentsForDoctorController,
  updateAppointmentStatusController
} from "../controllers/appointment.controller.js";
import { authMiddleware } from "../middlewares/authRoles.js";

const router = express.Router();

router.post("/appointments/book", authMiddleware, bookAppointmentController); //done✅
router.get("/appointments/my-appointments",authMiddleware,getMyAppointmentsController); //done✅
router.get("/appointments/doctorsViewAllAppointments",authMiddleware,getAllAppointmentsForDoctorController) //done✅
router.patch("/appointments/updateAppointmentStatus/:id", authMiddleware, updateAppointmentStatusController); //done✅


export default router;