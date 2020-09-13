import React, { memo, useState } from "react";
import { State } from "../../state/state";
import { gameTimeSelector } from "../../state/state-selector";
import { Button } from "../Button";
import { Stat } from "../Stat/Stat";

type Props = {
  state: State;
};

type RoshanStopwatch = {
  time: number;
  isActive: boolean;
};

const RESPAWN_TIME = {
  MINIMAL: 8 * 60,
  MAXIMUM: 11 * 60,
};

function normalizeNumber(num: number) {
  if (num < 10) {
    return `0${num}`;
  }

  return num.toString();
}

function formatSeconds(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${normalizeNumber(minutes)}:${normalizeNumber(seconds)}`;
}

function roshanIsDead(
  { isActive, time }: RoshanStopwatch,
  currentGameTime: number
) {
  return isActive && time + RESPAWN_TIME.MINIMAL > currentGameTime;
}

function roshanTimeDeadSelector(
  { time }: RoshanStopwatch,
  currentGameTime: number
) {
  const timeSinceDead = currentGameTime - time;
  const result = RESPAWN_TIME.MAXIMUM - timeSinceDead;

  return formatSeconds(result);
}

function schrodingerRoshan(
  { isActive, time }: RoshanStopwatch,
  currentGameTime: number
) {
  return (
    isActive &&
    time + RESPAWN_TIME.MINIMAL < currentGameTime &&
    time + RESPAWN_TIME.MAXIMUM > currentGameTime
  );
}

export const RoshanButton = memo(function RoshanButton({ state }: Props) {
  const currentGameTime = gameTimeSelector(state) || 0;
  const [roshanStopwatch, setRoshanStopwatch] = useState<RoshanStopwatch>({
    isActive: false,
    time: 0,
  });

  function handleClick() {
    setRoshanStopwatch({
      time: currentGameTime,
      isActive: true,
    });
  }

  function handleReset() {
    setRoshanStopwatch({
      time: 0,
      isActive: false,
    });
  }

  if (
    roshanIsDead(roshanStopwatch, currentGameTime) ||
    schrodingerRoshan(roshanStopwatch, currentGameTime)
  ) {
    return (
      <Stat
        onClick={handleReset}
        name="ROSH"
        value={roshanTimeDeadSelector(roshanStopwatch, currentGameTime)}
        warning={schrodingerRoshan(roshanStopwatch, currentGameTime)}
      />
    );
  }

  return <Button onClick={handleClick}>ROSH</Button>;
});
