import express from "express";
import * as directorController from "../controllers/director_controllers.js";

const router = express.Router();

router.get("/", directorController.getAllDirectors);
router.get("/:id", directorController.getDirectorById);
router.post("/", directorController.createDirector);
router.put("/:id", directorController.updateDirector);
router.delete("/:id", directorController.deleteDirector);
router.get("/:id/movies", directorController.getMoviesByDirector);

export default router;