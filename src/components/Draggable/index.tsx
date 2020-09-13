import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  -webkit-app-region: drag;
  position: absolute;
  width: 16px;
  height: 16px;
  background: #474f5c;
`;

export const Draggable = memo(function Draggable() {
  return <Container />;
});
