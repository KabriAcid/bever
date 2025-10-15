import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

// auth
import authRoutes from "./routes/auth.js";
import categoriesRoutes from "./routes/categories.js";
import mockRegisterRoutes from "./routes/mockRegister.js";

// global index (handles remaining routes)
import routes from "./routes/routes.js";

dotenv.config();

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    optionsSuccessStatus: 200,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// Core Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/mock-register", mockRegisterRoutes);

// Global Router (handles all other feature routes)
app.use("/api", routes);

// Error handler should be after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
