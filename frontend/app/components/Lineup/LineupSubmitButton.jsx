"use client";   
import { useState } from "react";
import { submitLineup } from "../../services/api";

export default function LineupSubmitButton({ selected, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const disabled = selected.length < 3;
const [error, setError] = useState("");
    


async function handleSubmit() {
    if(disabled) return;
    setLoading(true);
    setError("");
    try {
        const playersToSend = selected.map(p => typeof p === "string" ? p : p.full_name);
        await submitLineup(playersToSend);
        onSuccess();
    } catch(err) {
        alert(err.message);
    } finally {
        setLoading(false);
    }
}

    return(
        <div style={{ marginTop: 16 , backgroundColor: "white", padding: "16px", borderRadius: "8px", textAlign: "center"}}>
      <button
        onClick={handleSubmit}
        disabled={disabled || loading}
        title={disabled ? "You need at least 3 players to submit a lineup" : ""}
        style={{ padding: "8px 16px", cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {loading ? "Submitting..." : "Submit Lineup"}
      </button>
      {error && (
        <div style={{ color: "red", marginTop: 8 }}>
          {error}
          </div>
      )}
    </div>
    );

}