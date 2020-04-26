import { State } from "../state/state";
import { useState } from "react";
import { useInterval } from "./useInterval";

const SERVER_URL = "http://localhost:3001/time";
const UPDATE_FREQUENTLY = Number(process.env.REACT_APP_SERVER_UPDATE_FREQUENTLY);

export function useServerState(): State {
  const [state, setState] = useState<State>({});

  useInterval(async () => {
    try {
      const data = await (await fetch(SERVER_URL)).json();
      setState(data);
    } catch {}
  }, UPDATE_FREQUENTLY);

  return state;
}
