import React from "react";
import { useDota2 } from "./hooks/useDota2";
import { Stat } from "./components/Stat/Stat";
import "./App.css";
import {
  isLess11MinutesSelector,
  gpmSelector,
  benchmarksGPMSelector,
  benchmarksLVLSelector,
  LHSelector,
  LHTENSelector,
} from "./state/state-selector";
import { RoshanButton } from "./components/RoshanButton";
import { Draggable } from "./components/Draggable";

function App() {
  const state = useDota2();
  const isLess11Minutes = isLess11MinutesSelector(state);

  return (
    <div className="App">
      <Draggable />
      <header className="App-header">
        {/* <Stat name="time" value={clockTimeSelector(state)} /> */}
        <Stat name="GPM" value={gpmSelector(state)} />
        ----- 99% -----
        <Stat name="GPM" value={benchmarksGPMSelector(state)} />
        <Stat name="LVL" value={benchmarksLVLSelector(state)} />
        <Stat name="LH" value={LHSelector(state)} />
        {isLess11Minutes && <Stat name="LHTEN" value={LHTENSelector(state)} />}
        <RoshanButton state={state} />
      </header>
    </div>
  );
}

export default App;
