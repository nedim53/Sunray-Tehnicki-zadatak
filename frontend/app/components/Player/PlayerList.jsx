"use client";

export default function PlayerList({players}){
    if(players.length === 0){
        return null;
    }
    return(
        <div style={{ marginTop: "20px" }}>
      <h3>Available Players</h3>
      <ul>
        {players.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
    )
}