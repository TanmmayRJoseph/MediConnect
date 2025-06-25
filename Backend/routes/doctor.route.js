import express from "express";
import {createDoctorController,getDoctorsController,getDoctorByIdController,deleteDoctorByIdController,updateAvailabilityController,updateDoctorPicController,getDoctorAppointmentStats} from "../controllers/doctor.controller.js";
import { authMiddleware, authorizeRoles } from "../middlewares/authRoles.js";
const router = express.Router();

router.get("/doctor/getAllDoctors", getDoctorsController); 
router.post("/doctor/createDoctor",authMiddleware ,createDoctorController); 
router.get("/doctor/:id", getDoctorByIdController);
router.delete("/doctor/deleteDoctor/:id",authMiddleware,deleteDoctorByIdController);
router.patch("/doctor/availability/:id",authMiddleware,updateAvailabilityController);
router.put("/doctor/updatePic",authMiddleware,updateDoctorPicController);
router.get('/doctors/statistics',authMiddleware,getDoctorAppointmentStats)

export default router;
