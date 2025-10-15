import express from "express";
import categoriesRoutes from "./categories.js";

const router = express.Router();

// Categories Routes
router.use("/categories", categoriesRoutes);

// Define default or fallback routes here
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Bever API!" });
});

export default router;
