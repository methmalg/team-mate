import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "team-mate-db",
  password: "87654321",
  port: 5432,
});

// --- ROUTES ---

// 1. GET /employees - Fetch all team members
app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 2. POST /employees - Add a new team member
app.post("/employees", async (req, res) => {
  const { name, role, department } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO employees (name, role, department) VALUES ($1, $2, $3) RETURNING *",
      [name, role, department]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
