import express from "express";
import { hashPassword } from "../utils/hash.js";
import { pool } from "../utils/db.js";

const router = express.Router();

// Mock Register Endpoint   
router.post("/mock-register", async (req, res) => {
  try {
    console.log("Received request at /mock-register:", req.body); // Log incoming request body

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
      console.warn("Validation failed: Missing fields in request body"); // Log validation failure
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await hashPassword(password);

    const [result] = await pool.query(
      `INSERT INTO users (business_name, owner_name, email, phone, address, ward, password_hash) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [businessName, ownerName, email, phone, address, ward, hashedPassword]
    );

    console.log("User registered successfully with ID:", result.insertId); // Log successful registration

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error in mock-register endpoint:", error); // Log detailed error
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
