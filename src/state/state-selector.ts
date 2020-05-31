import { createSelector } from "reselect";
import { State, Bench } from "./state";

const LVL_TABLE = Object.entries({
  1: 0,
  2: 230,
  3: 600,
  4: 1080,
  5: 1660,
  6: 2260,
  7: 2980,
  8: 3730,
  9: 4620,
  10: 5550,
  11: 6520,
  12: 7530,
  13: 8580,
  14: 9805,
  15: 11055,
  16: 12330,
  17: 13630,
  18: 14955,
  19: 16455,
  20: 18045,
  21: 19645,
  22: 21495,
  23: 23595,
  24: 25945,
  25: 28545,
  26: 32045,
  27: 36545,
  28: 42045,
  29: 48545,
  30: 56045,
});
const SECONDS_IN_MINUTE = 60;

export const gameStateSelector = (state: State) => state.gamestate;

export const mapSelector = (state: State) => gameStateSelector(state)?.map;

export const gameTimeSelector = (state: State) => mapSelector(state)?.game_time;

export const clockTimeSelector = (state: State) =>
  mapSelector(state)?.clock_time;

export const playerSelector = (state: State) =>
  gameStateSelector(state)?.player;

export const xpmSelector = (state: State) => playerSelector(state)?.xpm;

export const gpmSelector = (state: State) => playerSelector(state)?.gpm;

export const heroSelector = (state: State) => gameStateSelector(state)?.hero;

export const heroIdSelector = (state: State) => heroSelector(state)?.id;

export const benchmarksSelector = (state: State) => state.benchmarks;

export const benchmarksHeroIdSelector = (state: State) =>
  benchmarksSelector(state)?.hero_id;

export const benchmarksHasErrorSelector = (state: State) =>
  !!benchmarksSelector(state)?.error;

export const benchmark95PercentileSelector = (benches: Bench[] | undefined) =>
  benches?.find((bench) => bench.percentile === 0.95);

export const benchmarksResultSelector = (state: State) =>
  benchmarksSelector(state)?.result;

export const benchmarksGPM95Selector = createSelector(
  benchmarksResultSelector,
  (benchmarksResult) =>
    benchmark95PercentileSelector(benchmarksResult?.gold_per_min)?.value
);

export const benchmarksLVL95Selector = createSelector(
  benchmarksResultSelector,
  clockTimeSelector,
  (benchmarksResult, time) => {
    const xpm = benchmark95PercentileSelector(benchmarksResult?.xp_per_min)
      ?.value;

    if (!xpm || !time) {
      return undefined;
    }

    const currentXP = (time / SECONDS_IN_MINUTE) * xpm;
    const LVLTableRow = LVL_TABLE.find((val) => currentXP < val[1]);

    if (!LVLTableRow) {
      return undefined;
    }

    const [nextLVL, nextTotalXP] = LVLTableRow;
    const modXP = Math.round(nextTotalXP - currentXP);

    return `${Number(nextLVL) - 1}(-${modXP}xp)`;
  }
);

export const LHSelector = createSelector(
  benchmarksResultSelector,
  clockTimeSelector,
  (benchmarksResult, time) => {
    const LHPM = benchmark95PercentileSelector(
      benchmarksResult?.last_hits_per_min
    )?.value;

    if (!LHPM || !time) {
      return undefined;
    }

    return Math.round((time / SECONDS_IN_MINUTE) * LHPM);
  }
);

export const LHTENSelector = createSelector(
  benchmarksResultSelector,
  (benchmarksResult) =>
    benchmark95PercentileSelector(benchmarksResult?.lhten)?.value
);
