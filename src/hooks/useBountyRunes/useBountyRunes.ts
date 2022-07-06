import { useEffect, useState } from "react";
import useSound from "use-sound";
import bountiesMp3 from "./bounties.mp3";
import { State } from "../../state/state";
import { clockTimeSelector } from "../../state/state-selector";

export const BOUNTY_RUNE_INTERVAL = Number(
  process.env.REACT_APP_BOUNTY_RUNE_INTERVAL
);
export const ALARM_BEFORE = Number(process.env.REACT_APP_ALARM_BEFORE);

export function getInterval(seconds: number) {
  return Math.floor(seconds / BOUNTY_RUNE_INTERVAL);
}

function isNegative(N: number) {
  return N < 0;
}

export function isNeedToPlay(gameTime: number, lastIntervalPlay: number) {
  if (lastIntervalPlay < 0 || gameTime < 0) {
    return false;
  }
  const currentInterval = getInterval(gameTime); // 31 -> 0
  const nextInterval = getInterval(gameTime + ALARM_BEFORE); // 31 -> 1

  return currentInterval !== nextInterval && lastIntervalPlay !== nextInterval;
}

export function useBountyRunes(state: State) {
  const clockTime = clockTimeSelector(state);
  const [play] = useSound(bountiesMp3, { volume: 0.25 });
  const [lastIntervalPlay, setLastIntervalPlay] = useState<number>(-1);

  useEffect(() => {
    if (!clockTime || isNegative(clockTime)) {
      return;
    }

    if (isNeedToPlay(clockTime, lastIntervalPlay)) {
      play();
      setLastIntervalPlay(getInterval(clockTime + ALARM_BEFORE));
    }
  }, [clockTime, lastIntervalPlay, play]);
}
