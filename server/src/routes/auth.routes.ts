import { Router } from "express";
import { registerUser, loginUser } from "../services/auth.ts";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const result = await registerUser(username, password);
  res.json(result);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUser(username, password);
  res.json(result);
});

export default router;
