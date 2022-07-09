import { useEffect, useState } from "react";
import useSound from "use-sound";
import { State } from "../../state/state";
import { gameTimeSelector } from "../../state/state-selector";
import roshanRespawnMp3 from "./spawn.mp3";

type RoshanStopwatch = {
  time: number;
  isActive: boolean;
  isPlayedSound: boolean;
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

function spawnProbability({ time }: RoshanStopwatch, currentGameTime: number) {
  return (currentGameTime - time) / (RESPAWN_TIME.MAXIMUM / 100);
}

function needToPlaySound(
  { time, isPlayedSound, isActive }: RoshanStopwatch,
  currentGameTime: number
) {
  const timeSinceDead = currentGameTime - time;
  // 30 seconds for Leeway
  const result = timeSinceDead - RESPAWN_TIME.MINIMAL + 30;

  return isActive && !isPlayedSound && result > 0;
}

export function useRoshanSpawn(state: State) {
  const currentGameTime = gameTimeSelector(state) || 0;
  const [play] = useSound(roshanRespawnMp3, { volume: 0.25 });
  const [roshanStopwatch, setRoshanStopwatch] = useState<RoshanStopwatch>({
    isActive: false,
    time: 0,
    isPlayedSound: false,
  });

  function handleDead() {
    setRoshanStopwatch({
      time: currentGameTime,
      isActive: true,
      isPlayedSound: false,
    });
  }

  function handleReset() {
    setRoshanStopwatch({
      time: 0,
      isActive: false,
      isPlayedSound: false,
    });
  }

  const isDead = roshanIsDead(roshanStopwatch, currentGameTime);
  const isDeadOrLive = schrodingerRoshan(roshanStopwatch, currentGameTime);
  const timeToSpawn = roshanTimeDeadSelector(roshanStopwatch, currentGameTime);
  const probability = spawnProbability(roshanStopwatch, currentGameTime);

  useEffect(() => {
    if (needToPlaySound(roshanStopwatch, currentGameTime)) {
      play();
      setRoshanStopwatch({
        ...roshanStopwatch,
        isPlayedSound: true,
      });
    }
  }, [roshanStopwatch, currentGameTime, setRoshanStopwatch, play]);

  return {
    handleDead,
    handleReset,
    isDead,
    isDeadOrLive,
    timeToSpawn,
    probability,
  };
}
