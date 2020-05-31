import React from "react";
import { useDota2 } from "./hooks/useDota2";
import { Stat } from "./components/Stat/Stat";
import "./App.css";
import {
  // clockTimeSelector,
  gpmSelector,
  benchmarksGPM95Selector,
  benchmarksLVL95Selector,
  LHSelector,
  LHTENSelector,
} from "./state/state-selector";

function App() {
  const state = useDota2();

  return (
    <div className="App">
      <header className="App-header">
        {/* <Stat name="time" value={clockTimeSelector(state)} /> */}
        <Stat name="GPM" value={gpmSelector(state)} />
        ----- 95% -----
        <Stat name="GPM" value={benchmarksGPM95Selector(state)} />
        <Stat name="LVL" value={benchmarksLVL95Selector(state)} />
        <Stat name="LH" value={LHSelector(state)} />
        <Stat name="LHTEN" value={LHTENSelector(state)} />
      </header>
    </div>
  );
}

export default App;
