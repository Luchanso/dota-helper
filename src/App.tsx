import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import bountiesMp3 from "./bounties.mp3";
import "./App.css";
import { State } from "./state/state";

function useDota2() {
  const [state, setState] = useState<State>();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setState(await (await fetch("http://localhost:3001/time")).json());
      } catch {}
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { state };
}

function needPlay(state: any) {
  const time = state?.gamestate?.map?.clock_time;

  if (!time) {
    return false;
  }

  return time % (60 * 4.5) === 0;
}

function App() {
  const { state } = useDota2();
  const [play] = useSound(bountiesMp3, { volume: 0.25 });

  useEffect(() => {
    if (needPlay(state)) {
      play();
    }
  }, [state, play]);

  return (
    <div className="App">
      <header className="App-header">
        <pre>{JSON.stringify(state, null, 4)}</pre>
      </header>
    </div>
  );
}

export default App;
