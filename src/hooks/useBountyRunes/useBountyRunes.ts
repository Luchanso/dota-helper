import { useEffect, useState } from "react";
import useSound from "use-sound";
import bountiesMp3 from "./bounties.mp3";
import { State } from "../../state/state";
import { clockTimeSelector } from "../../state/state-selector";

export const BOUNTY_RUNE_INTERVAL = Number(
  process.env.REACT_APP_BOUNTY_RUNE_INTERVAL
);
export const ALARM_BEFORE = Number(process.env.REACT_APP_ALARM_BEFORE);

export function calcNextSound(
  gameTime: number,
  interval: number,
  alarmBefore: number
) {
  return (Math.floor(gameTime / interval) + 1) * interval - alarmBefore;
}

export function useBountyRunes(state: State) {
  const clockTime = clockTimeSelector(state);
  const [play] = useSound(bountiesMp3, { volume: 0.25 });
  const [nextInterval, setNextInterval] = useState<number>(
    calcNextSound(0, BOUNTY_RUNE_INTERVAL, ALARM_BEFORE)
  );

  useEffect(() => {
    if (!clockTime) {
      return;
    }

    const needToPlay = clockTime >= nextInterval;
    console.log("need play:", needToPlay);
    console.log("clockTime, nextInterval", clockTime, nextInterval);

    if (needToPlay) {
      play();
      setNextInterval(
        calcNextSound(
          clockTime + ALARM_BEFORE,
          BOUNTY_RUNE_INTERVAL,
          ALARM_BEFORE
        )
      );
    }
  }, [clockTime, nextInterval, play]);
}
