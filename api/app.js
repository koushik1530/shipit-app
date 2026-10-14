const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");




const app = express();
app.use(express.json());
app.use(cors());


const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  res.json(result.rows);
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const result = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.status(201).json(result.rows[0]);
});

const PORT = process.env.PORT || 3000;

// Retry database setup until Postgres is ready, then start the server
async function start() {
  for (let i = 1; i <= 10; i++) {
    try {
      await initDb();
      break;
    } catch (err) {
      console.log(`Database not ready (attempt ${i}), retrying...`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

start();
