import * as directorService from "../services/director_services.js";

export const getAllDirectors = async (req, res) => {
  try {
    const directors = await directorService.getAllDirectors();
    res.json(directors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDirectorById = async (req, res) => {
  try {
    const director = await directorService.getDirectorById(req.params.id);
    if (!director) return res.status(404).json({ error: "Director not found" });
    res.json(director);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDirector = async (req, res) => {
  try {
    const newDirector = await directorService.createDirector(req.body);
    res.status(201).json(newDirector);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDirector = async (req, res) => {
  try {
    const updatedDirector = await directorService.updateDirector(req.params.id, req.body);
    res.json(updatedDirector);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDirector = async (req, res) => {
  try {
    await directorService.deleteDirector(req.params.id);
    res.json({ message: "Director deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMoviesByDirector = async (req, res) => {
  try {
    const movies = await directorService.getMoviesByDirector(req.params.id);
    res.json(movies);
  } catch (err) {
    if (err.message === "Director não encontrado") {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};