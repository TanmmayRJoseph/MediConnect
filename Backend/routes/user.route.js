import express from "express";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authRoles.js";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  profileUserController,
} from "../controllers/user.controller.js";

const router = express.Router(); // ✅ Correct

router.post("/user/register", registerUserController);
router.post("/user/login", loginUserController);
router.post("/user/logout", logoutUserController);
router.get("/user/profile", authMiddleware, profileUserController);

export default router;
