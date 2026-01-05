"use client";

import { useState,useEffect } from "react";
import PlayerInput from "./components/Player/PlayerInput";
//import PlayerList from "./components/Player/PlayerList";
import {getPlayers, addPlayerApi} from "../app/services/api";
import LineupSelector from "./components/Player/LineupSelector";
import LineupSubmitButton from "./components/Lineup/LineupSubmitButton";
import TopPlayers from "./components/Player/TopPlayers";

export default function Home() {
    const [players, setPlayers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [refreshTopPlayers, setRefreshTopPlayers] = useState(0);
  useEffect(() => {
      getPlayers().then((data) => {
        const names = Array.isArray(data) ? data.sort((a,b)=>a.localeCompare(b)) : [];
        setPlayers(names);
      });
    }, []);


    async function addPlayer(fullName) {
    await addPlayerApi(fullName);
    setPlayers((prev) => {
      if (prev.includes(fullName)) return prev;
      return [...prev, fullName].sort((a,b)=>a.localeCompare(b));
    });

  }

  function clearSelected(){
    setSelected([]);
    setRefreshTopPlayers(prev => prev + 1);
  }

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-white-900 p-4" style={{color:"black"}}>
     <div style={{backgroundColor: "#ADD8E6", padding:"56px", borderRadius:"8px"}}>
      <h1 style={{fontWeight:"bolder", color:"black"}}>Team Lineup Builder</h1>
      <h5 style={{color:"black"}}>Create and submit your custom sports lineup.</h5>
      <div style={{backgroundColor:"white", borderRadius:"8px", padding:"16px", marginTop:"16px"}}>
        <PlayerInput onAdd={addPlayer} /></div>
      <LineupSelector
      players={players}
       selected={selected}
        onChange={setSelected}></LineupSelector>
      <LineupSubmitButton
      selected={selected}
       onSuccess={clearSelected}></LineupSubmitButton>
      <TopPlayers key={refreshTopPlayers} />
    </div>
    </div>
  );
}
