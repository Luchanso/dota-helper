import React from "react";
import { useDota2 } from "./hooks/useDota2";
import "./App.css";

function App() {
  const gameTime = useDota2();

  return (
    <div className="App">
      <header className="App-header">
        <code>{gameTime}</code>
      </header>
    </div>
  );
}

export default App;
