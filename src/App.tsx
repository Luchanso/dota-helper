import { useDota2 } from "./hooks/useDota2";
import { Stat } from "./components/Stat/Stat";
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
import styled, { createGlobalStyle } from "styled-components";

const AppHeader = styled.header`
  background-color: rgba(40, 44, 52, 0.8);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  color: white;
  padding: 0 32px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
` as any;

function App() {
  const state = useDota2();
  const isLess11Minutes = isLess11MinutesSelector(state);

  return (
    <>
      <GlobalStyle />
      <Draggable />
      <AppHeader className="App-header">
        {/* <Stat name="time" value={clockTimeSelector(state)} /> */}
        <Stat name="GPM" value={gpmSelector(state)} />
        ----- Best play -----
        <Stat name="GPM" value={benchmarksGPMSelector(state)} />
        <Stat name="LVL" value={benchmarksLVLSelector(state)} />
        <Stat name="LH" value={LHSelector(state)} />
        {isLess11Minutes && <Stat name="LHTEN" value={LHTENSelector(state)} />}
        <RoshanButton state={state} />
      </AppHeader>
    </>
  );
}

export default App;
