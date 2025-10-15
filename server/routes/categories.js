import express from "express";

const router = express.Router();

// Mock data for categories
let categories = [
  { id: 1, name: "Beverages" },
  { id: 2, name: "Snacks" },
  { id: 3, name: "Dairy" },
];

// Get all categories
router.get("/", (req, res) => {
  res.status(200).json(categories);
});

// Get a single category by ID
router.get("/:id", (req, res) => {
  const category = categories.find((cat) => cat.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
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
