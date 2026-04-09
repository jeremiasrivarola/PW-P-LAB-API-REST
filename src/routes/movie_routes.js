import express from "express";
import * as movieController from "../controllers/movie_controllers.js";
import { authenticateToken } from "../middlewares/auth_middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.get("/", authenticateToken, movieController.getAllMovies);
router.get("/search", authenticateToken, movieController.searchMovies);
router.get("/:id", authenticateToken, movieController.getMovieById);

router.post("/", authenticateToken, authorizeRole(["admin"]), movieController.createMovie);
router.put("/:id", authenticateToken, authorizeRole(["admin"]), movieController.updateMovie);
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), movieController.deleteMovie);

export default router;