import React from "react";
import styled, { css } from "styled-components";

type Props = {
  name: string;
  value?: number | string;
  warning?: boolean;
  onClick?: () => void;
};

const StatContainer = styled.div`
  margin: 2px 0;
  ${(props: { warning: boolean }) =>
    props.warning &&
    css`
      color: #ffc77d;
    `}
`;

export function Stat({
  name,
  value,
  warning = false,
  onClick = () => {},
}: Props) {
  if (!value) {
    return null;
  }

  return (
    <StatContainer warning={warning} onClick={onClick}>
      {name}: {value}
    </StatContainer>
  );
}
