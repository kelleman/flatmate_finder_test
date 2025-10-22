import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import profileRoutes from "./routes/profile.routes.js";


dotenv.config();

const app = express();

// Setup dirname helpers for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// API routes
app.use("/api", profileRoutes);

// Serve React frontend (built via Vite)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
