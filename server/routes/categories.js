import express from "express";
import { pool } from "../utils/db.js";

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new category
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const newCategory = {
    id: categories.length + 1,
    name,
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// Update a category by ID
router.put("/:id", (req, res) => {
  const { name } = req.body;
  const category = categories.find((cat) => cat.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  category.name = name;
  res.status(200).json(category);
});

// Delete a category by ID
router.delete("/:id", (req, res) => {
  const categoryIndex = categories.findIndex(
    (cat) => cat.id === parseInt(req.params.id)
  );
  if (categoryIndex === -1) {
    return res.status(404).json({ message: "Category not found" });
  }
  categories.splice(categoryIndex, 1);
  res.status(204).send();
});

export default router;
