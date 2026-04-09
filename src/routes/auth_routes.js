import express from "express";
import * as authController from "../controllers/auth_controllers.js";
import { authenticateToken } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/profile", authenticateToken, authController.profile);

export default router;