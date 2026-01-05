"use client";
import { useState, useEffect } from "react";
import { getTopPlayers } from "../../services/api";

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

export default function TopPlayers() {
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTopPlayers()
      .then((data) => {
        setTopPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top players:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ marginTop: 32 }}>
        <h2>Top Players</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (topPlayers.length === 0) {
    return (
      <div style={{ marginTop: 32 }}>
        <h2>Top Players</h2>
        <p>No players yet. Submit some lineups to see top players!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 32 , backgroundColor: "white", padding: "16px", borderRadius: "8px"}}>
      <h2>Top Players</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {topPlayers.map((player, index) => {
          const nameWithoutSpaces = player.full_name.replace(/\s/g, "");
          const nameLength = nameWithoutSpaces.length;
          const isPrimeLength = isPrime(nameLength);
          
          return (
            <li
              key={`${player.full_name}-${index}`}
              style={{
                marginBottom: 8,
                padding: "8px 0",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <span
                style={{
                  fontWeight: isPrimeLength ? "bold" : "normal",
                  color: isPrimeLength ? "#0066cc" : "inherit",
                }}
              >
                {player.full_name}
              </span>
              <span style={{ marginLeft: 12, color: "#666" }}>
                ({player.count} {player.count === 1 ? "submission" : "submissions"})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

