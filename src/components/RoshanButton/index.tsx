import React, { memo } from "react";
import { State } from "../../state/state";
import { Button } from "../Button";
import { Stat } from "../Stat/Stat";
import { useRoshanSpawn } from "../../hooks/useRoshanSpawn/useRoshanSpawn";

type Props = {
  state: State;
};

export const RoshanButton = memo(function RoshanButton({ state }: Props) {
  const {
    handleDead,
    handleReset,
    isDead,
    isDeadOrLive,
    timeToSpawn,
  } = useRoshanSpawn(state);

  if (isDead || isDeadOrLive) {
    return (
      <Stat
        onClick={handleReset}
        name="ROSH"
        value={timeToSpawn}
        warning={isDeadOrLive}
      />
    );
  }

  return <Button onClick={handleDead}>ROSH</Button>;
});
