import { useServerState } from "./useServerState";
import { useBountyRunes } from "./useBountyRunes/useBountyRunes";

export function useDota2() {
  const state = useServerState();
  useBountyRunes(state);

  return state;
}
