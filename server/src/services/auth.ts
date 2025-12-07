// server/src/services/auth.ts
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import redisClient from "../config/redis";
import User, { IUser } from "../models/User";

// Interface for responses
export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  totpSecret?: string;
}

/**
 * Register a new user
 */
export async function registerUser(
  username: string,
  password: string
): Promise<AuthResponse> {
  const existing = await User.findOne({ username });
  if (existing) return { success: false, message: "User already exists" };

  const hashed = await bcrypt.hash(password, 10);
  const totpSecret = authenticator.generateSecret();

  const newUser = new User({ username, password: hashed, totpSecret });
  await newUser.save();

  return { success: true, totpSecret };
}

/**
 * Login user and generate Redis session token
 */
export async function loginUser(
  username: string,
  password: string
): Promise<AuthResponse> {
  const user = await User.findOne({ username }) as IUser | null;
  if (!user) return { success: false, message: "User not found" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { success: false, message: "Incorrect password" };

  const token = Math.random().toString(36).substring(2);
  await redisClient.set(`session:${token}`, user._id.toString(), {
    EX: 86400, // 24 hours
  });

  return { success: true, token, totpSecret: user.totpSecret };
}

/**
 * Validate Redis session token
 */
export async function validateSession(token: string): Promise<boolean> {
  const session = await redisClient.get(`session:${token}`);
  return session !== null;
}
