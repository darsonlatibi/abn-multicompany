import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import "./models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================================================
// PATH
// =========================================================

const clientDist = path.resolve(__dirname, "../../client/dist");

const app = express();

// =========================================================
// CORS
// =========================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",

  "https://multicompany.abn.web.id",
  "https://www.multicompany.abn.web.id",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS origin not allowed: ${origin}`);

      return callback(new Error(`CORS origin not allowed: ${origin}`));
    },

    credentials: true,
  }),
);

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// =========================================================
// DATABASE
// =========================================================

try {
  await sequelize.authenticate();

  await sequelize.sync();

  console.log("==============================================");
  console.log(" EMAIL DATABASE READY");
  console.log(" Table: emails");
  console.log(" Status: READY");
  console.log("==============================================");
} catch (error) {
  console.error("==============================================");
  console.error(" EMAIL DATABASE INIT FAILED");
  console.error("==============================================");
  console.error(error);
  console.error("==============================================");

  throw error;
}

// =========================================================
// AUTH
// =========================================================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// =========================================================
// HEALTH CHECK
// =========================================================

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "ABN MultiCompany API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// =========================================================
// STATIC FRONTEND
// =========================================================

app.use(express.static(clientDist));

// =========================================================
// ROOT
// =========================================================

app.get("/", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// =========================================================
// API 404
// =========================================================

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =========================================================
// FRONTEND FALLBACK
// =========================================================

app.use((req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  res.sendFile(path.join(clientDist, "index.html"));
});

// =========================================================
// ERROR HANDLER
// =========================================================

app.use((err, _req, res, _next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
