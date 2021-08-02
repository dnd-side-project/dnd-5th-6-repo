import React, { memo } from "react";
import styled from "styled-components";

const Btn = styled.button`
  margin: 1%;
  background-color: #47474700;
  border: 1.5px solid #474747c4;
  border-radius: 28px;
  height: 1.8rem;
  box-shadow: none;
  :hover {
    background-color: #474747c4;
    color: white;
  }
`;

const Button = memo((props) => {
  const handleClick = (key) => {
    props.setSortByExe(key);
  };
  console.log(props);
  return <Btn onClick={() => handleClick(props.index)}>{props.exercise}</Btn>;
});

export default Button;
