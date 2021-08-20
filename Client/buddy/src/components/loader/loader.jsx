import React from "react";
import styled, { keyframes } from "styled-components";
import { PaceBuddy } from "./../../icons";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
  vertical-align: middle;
`;

function Load() {
  return (
    <Loader>
      <PaceBuddy size={36} />
    </Loader>
  );
}

export default Load;
