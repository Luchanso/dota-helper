import { useServerState } from "./useServerState";
import { useBenchmarks } from "./useBenchmarks";
import { useBountyRunes } from "./useBountyRunes/useBountyRunes";
// import { State } from "../state/state";

export function useDota2() {
  const state = useBenchmarks(useServerState());
  useBountyRunes(state);

  return state;
}
