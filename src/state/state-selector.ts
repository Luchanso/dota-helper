import { State } from "./state";

export const gameStateSelector = (state: State) => state.gamestate;

export const mapSelector = (state: State) => gameStateSelector(state)?.map;

export const gameTimeSelector = (state: State) => mapSelector(state)?.game_time;

export const clockTimeSelector = (state: State) =>
  mapSelector(state)?.clock_time;
