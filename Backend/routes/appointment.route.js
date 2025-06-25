import express from "express";
import {
  bookAppointmentController,
  getMyAppointmentsController,
  getAllAppointmentsForDoctorController,
  updateAppointmentStatusController
} from "../controllers/appointment.controller.js";
import { authMiddleware } from "../middlewares/authRoles.js";

const router = express.Router();

router.post("/appointments/book", authMiddleware, bookAppointmentController);
router.get("/appointments/my-appointments",authMiddleware,getMyAppointmentsController);


router.get("/appointments/doctorsViewAllAppointments",authMiddleware,getAllAppointmentsForDoctorController)
router.patch("/appointments/updateAppointmentStatus/:id", authMiddleware, updateAppointmentStatusController);


export default router;