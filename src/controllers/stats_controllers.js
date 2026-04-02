import * as statsService from "../services/stats_services.js";

export const getStats = async (req, res) => {
  try {
    const stats = await statsService.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};