import { bannedLastNames } from "../utils/backlist.js";
import { pool } from "../db/db.js";

export async function submitLineup(req, res) {
  const { players } = req.body;

  if (!Array.isArray(players) || players.length < 3) {
    return res.status(400).json({ message: "At least 3 players required" });
  }

  const banned = players.filter(p => {
    const lastName = p.trim().split(" ").slice(-1)[0].toLowerCase();
    return bannedLastNames.includes(lastName);
  });

  if (banned.length > 0) {
    return res.status(400).json({
      error: "Some players have banned last names"
    });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const lineupRes = await client.query(
      "INSERT INTO lineups DEFAULT VALUES RETURNING id"
    );
    const lineupId = lineupRes.rows[0].id;

    for (const p of players) {
      await client.query(
        "INSERT INTO lineup_players (lineup_id, full_name) VALUES ($1, $2)",
        [lineupId, p]
      );

      await client.query(
        `INSERT INTO player_stats (full_name, count) 
         VALUES ($1, 1) 
         ON CONFLICT (full_name) 
         DO UPDATE SET count = player_stats.count + 1`,
        [p]
      );
    }

    await client.query("COMMIT");
    res.json({ message: "Lineup submitted successfully", lineupId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Database error:", err);
    if (err.code === '23505') { 
      res.status(400).json({ 
        message: "One or more players already exist in another lineup. Please remove the UNIQUE constraint from lineup_players.full_name in your database." 
      });
    } else {
      res.status(500).json({ 
        message: "Database error", 
        error: process.env.NODE_ENV === 'development' ? err.message : undefined 
      });
    }
  } finally {
    client.release();
  }
}
