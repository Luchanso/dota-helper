import { memo } from "react";
import { State } from "../../state/state";
import { Button } from "../Button";
import { Stat } from "../Stat/Stat";
import { useRoshanSpawn } from "../../hooks/useRoshanSpawn/useRoshanSpawn";
import styled from "styled-components";

const Box = styled.div`
  margin-top: 4px;
`;

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
    probability,
  } = useRoshanSpawn(state);

  const value = `${timeToSpawn}${
    isDeadOrLive ? ` ${Math.round(probability)}%` : ""
  }`;

  if (isDead || isDeadOrLive) {
    return (
      <Stat
        onClick={handleReset}
        name="ROSH"
        value={value}
        warning={isDeadOrLive}
      />
    );
  }

  return (
    <Box>
      <Button onClick={handleDead}>ROSH</Button>
    </Box>
  );
});
