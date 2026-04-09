import * as movieService from "../services/movie_services.js";

export const getAllMovies = async (req, res) => {
  try {
    const { page, limit, sort } = req.query;
    const movies = await movieService.getAllMovies({ page, limit, sort });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: "Query 'title' é obrigatória" });

    const movies = await movieService.searchMoviesByTitle(title);

    if (!movies || movies.length === 0) {
      return res.status(404).json({ error: `Nenhum filme encontrado com título contendo "${title}"` });
    }

    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const newMovie = await movieService.createMovie(req.body);
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await movieService.deleteMovie(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};