import express from "express";
import dotenv from "dotenv";
import directorRoutes from "./routes/director_routes.js";
import movieRoutes from "./routes/movie_routes.js";
import statsRoutes from "./routes/stats_routes.js";
import { errorHandler } from "./middlewares/error_middleware.js";

dotenv.config();
const app = express();
app.use(express.json());

// Rotas
app.use("/directors", directorRoutes);
app.use("/movies", movieRoutes);
app.use("/stats", statsRoutes);  
app.use(errorHandler);

// Porta do .env
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});