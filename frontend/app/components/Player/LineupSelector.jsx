"use client";
import { useMemo, useState } from "react";

export default function LineupSelector({ players, selected, onChange }) {
  const [open, setOpen] = useState(false);

  const available = useMemo(
    () => players.filter(p => !selected.includes(p)),
    [players, selected]
  );

  function toggle(name) {
    if (selected.includes(name)) {
      onChange(selected.filter(p => p !== name));
    } else {
      onChange([...selected, name]);
    }
  }

  const chipsText = selected.join(", ");
  const displayChips =
    chipsText.length > 40 ? chipsText.slice(0, 40) + "..." : chipsText;

  return (
    <div style={{ marginTop: 16 , width: "100%", borderRadius: "8px"}}>
      {selected.length > 0 && (
        <div style={{ marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden" }}>
          {displayChips}
        </div>
      )}

      <div style={{ border: "1px solid #000000ff", padding: 8 , borderRadius: "8px", backgroundColor: "white" , width: "100%"}}>
        <button onClick={() => setOpen(!open)}>
          Select players
        </button>

        {open && (
          <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
           
            {available.map((p, index) => (
  <li key={`${p}-${index}`}>
    <label>
      <input
        type="checkbox"
        checked={selected.includes(p)}
        onChange={() => toggle(p)}
      />
      {p}
    </label>
  </li>
))}

          </ul>
        )}
      </div>
    </div>
  );
}
