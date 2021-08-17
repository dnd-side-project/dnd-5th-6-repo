import React, { memo, useState } from "react";
import styled from "styled-components";

const Btn = styled.button`
  margin: 1%;
  background-color: ${(props) => (props.exeSelected ? "#00bee6" : "white")};
  border: 1.5px solid #c5c5c5;
  border-radius: 28px;
  height: 1.8rem;
  box-shadow: none;
  color: #c5c5c5;
  :hover {
    background-color: #00bee6;
    border: 1.5px solid #00bee6;
    color: white;
  }
`;

const Button = memo((props) => {
  const handleClick = (key) => {
    props.setSelectExe(key);
  };

  return (
    <Btn onClick={() => handleClick(props.index)}>
      {props.exercise ? props.exercise : "전체"}
    </Btn>
  );
});

export default Button;
