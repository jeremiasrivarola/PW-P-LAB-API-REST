import express from "express";
import * as directorController from "../controllers/director_controllers.js";
import { authenticateToken } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/", authenticateToken, directorController.getAllDirectors);
router.get("/:id", authenticateToken, directorController.getDirectorById);
router.post("/", authenticateToken, directorController.createDirector);
router.put("/:id", authenticateToken, directorController.updateDirector);
router.delete("/:id", authenticateToken, directorController.deleteDirector);

export default router;