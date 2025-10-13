const express = require("express");
const router = express.Router();
const path = require("path");
const { readJson, writeJson } = require("../utils/fs");
const multer = require("multer");

const DATA_FILE = path.join(__dirname, "..", "..", "data", "orders.json");

// file uploads (example)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "data", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  const orders = await readJson(DATA_FILE);
  res.json(orders || []);
});

router.get("/:id", async (req, res) => {
  const orders = await readJson(DATA_FILE);
  const o = (orders || []).find((x) => x.id === req.params.id);
  if (!o) return res.status(404).json({ error: "Not found" });
  res.json(o);
});

router.post("/", upload.none(), async (req, res) => {
  const orders = (await readJson(DATA_FILE)) || [];
  const payload = req.body;
  const newOrder = {
    id: `TXN-${Math.floor(Math.random() * 900000 + 1000)}`,
    orderDate: new Date().toISOString(),
    ...payload,
  };
  orders.unshift(newOrder);
  await writeJson(DATA_FILE, orders);
  res.status(201).json(newOrder);
});

router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "Missing status" });
  const orders = (await readJson(DATA_FILE)) || [];
  const idx = orders.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  orders[idx].status = status;
  await writeJson(DATA_FILE, orders);
  res.json(orders[idx]);
});

module.exports = router;
