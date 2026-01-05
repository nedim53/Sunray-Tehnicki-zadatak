import express from "express";
import cors from "cors";
import {pool} from "./db/db.js"
import lineupRoutes from "./routes/lineupRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/lineup", lineupRoutes);


app.get("/api/players", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT full_name FROM lineup_players WHERE full_name IS NOT NULL ORDER BY full_name ASC"
    );
    res.json(result.rows.map(r => r.full_name));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error fetching players" });
  }
});


app.post("/api/players", async (req, res) => {
  const { fullName } = req.body;
  if (!fullName) return res.status(400).json({ message: "Full name is required" });

  try {
    const exists = await pool.query("SELECT 1 FROM lineup_players WHERE full_name = $1", [fullName]);
    if (exists.rowCount > 0) return res.status(400).json({ message: "Player already exists" });

    await pool.query("INSERT INTO lineup_players (full_name) VALUES ($1)", [fullName]);
    res.json({ message: "Player added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error adding player" });
  }
});


app.get("/api/top-players", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT full_name, count FROM player_stats ORDER BY count DESC LIMIT 10"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error fetching top players" });
  }
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend radi " });
});

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
