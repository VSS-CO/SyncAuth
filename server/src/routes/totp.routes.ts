import { Router } from "express";
import { generateTOTP, verifyTOTP } from "../models/totp";
import { authenticator } from "otplib";

const router = Router();

router.get("/generate", (req, res) => {
  const secret = authenticator.generateSecret();
  const code = generateTOTP(secret);
  res.json({ secret, code });
});

router.post("/verify", (req, res) => {
  const { token, secret } = req.body;
  const valid = verifyTOTP(token, secret);
  res.json({ valid });
});

export default router;
    