import express from "express";
import {createDoctorController,getDoctorsController,getDoctorByIdController,deleteDoctorByIdController,updateAvailabilityController,updateDoctorPicController,getDoctorAppointmentStats} from "../controllers/doctor.controller.js";
import { authMiddleware, authorizeRoles } from "../middlewares/authRoles.js";
const router = express.Router();

router.get("/doctor/getAllDoctors", getDoctorsController); //done✅
router.post("/doctor/createDoctor",authMiddleware ,createDoctorController); //done✅
router.get("/doctor/:id", getDoctorByIdController); //done✅
router.delete("/doctor/deleteDoctor/:id",authMiddleware,deleteDoctorByIdController); //done✅
router.patch("/doctor/availability",authMiddleware,updateAvailabilityController); 
router.put("/doctor/updatePic",authMiddleware,updateDoctorPicController); //done✅
router.get('/doctors/statistics',authMiddleware,getDoctorAppointmentStats) //done✅

export default router;
