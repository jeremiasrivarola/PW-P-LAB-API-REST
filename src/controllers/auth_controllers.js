import * as authService from "../services/auth_services.js";

export const signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const result = await authService.signin(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const profile = (req, res) => {
  res.json({ user: req.user });
};