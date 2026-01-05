import {bannedLastNames} from '../../../backend/utils/backlist.js';
import { env } from 'process';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPlayers() {
  const res = await fetch(`${BASE_URL}/players`);
  if (!res.ok) throw new Error("Fetch players failed");
  return res.json();
}

export async function addPlayerApi(fullName) {
  const res = await fetch(`${BASE_URL}/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName }),
  });
  if (!res.ok) throw new Error("Add player failed");
  return res.json();
}

export async function submitLineup(players) {
const banned = players.filter(p => {
    const lastName = p.trim().split(" ")[1]?.toLowerCase();
    return bannedLastNames.includes(lastName);
  });

  if (banned.length > 0) {
    throw new Error("Some players have banned last names and cannot be added to the lineup.");
  }
  
  const res = await fetch(`${BASE_URL}/lineup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ players }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Submit lineup failed");
  }

  return res.json();
}

export async function getTopPlayers() {
  const res = await fetch(`${BASE_URL}/top-players`);
  if (!res.ok) throw new Error("Fetch top players failed");
  return res.json();
}

