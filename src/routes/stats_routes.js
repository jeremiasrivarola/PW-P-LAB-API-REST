import express from "express";
import * as statsController from "../controllers/stats_controllers.js";

const router = express.Router();

router.get("/", statsController.getStats);

export default router;