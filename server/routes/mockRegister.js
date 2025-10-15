import express from "express";
import { hashPassword } from "../utils/hash.js";
import { pool } from "../utils/db.js";

const router = express.Router();

// Mock Register Endpoint
router.post("/mock-register", async (req, res) => {
  try {
    const { businessName, ownerName, email, phone, address, ward, password } =
      req.body;

    if (
      !businessName ||
      !ownerName ||
      !email ||
      !phone ||
      !address ||
      !ward ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await hashPassword(password);

    const [result] = await pool.query(
      `INSERT INTO users (business_name, owner_name, email, phone, address, ward, password_hash) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [businessName, ownerName, email, phone, address, ward, hashedPassword]
    );

    res
      .status(201)
      .json({
        message: "User registered successfully",
        userId: result.insertId,
      });
  } catch (error) {
    console.error("Error in mock-register endpoint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
