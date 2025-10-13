const express = require("express");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const ordersRouter = require("./routes/orders");

function createApp({ dataDir }) {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // static assets (for uploaded files)
  app.use("/uploads", express.static(path.join(dataDir, "uploads")));

  app.use("/orders", ordersRouter);

  // simple health endpoint
  app.get("/health", (req, res) => res.json({ ok: true }));

  // error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

module.exports = { createApp };
