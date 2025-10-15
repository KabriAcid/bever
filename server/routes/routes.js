import express from "express";

const router = express.Router();

// Define default or fallback routes here
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Bever API!" });
});

export default router;
