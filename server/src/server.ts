// server/src/server.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import totpRoutes from "./routes/totp.routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // configure origin if needed
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/totp", totpRoutes);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
