import React from "react";
import { useDota2 } from "./hooks/useDota2";
import { Stat } from "./components/Stat/Stat";
import "./App.css";
import { clockTimeSelector, gpmSelector } from "./state/state-selector";

function App() {
  const state = useDota2();

  return (
    <div className="App">
      <header className="App-header">
        <Stat name="time" value={clockTimeSelector(state)} />
        <Stat name="GPM" value={gpmSelector(state)} />
      </header>
    </div>
  );
}

export default App;
