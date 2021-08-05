  
import React, { memo } from "react";
import styled from "styled-components";

const Btn = styled.button`
  margin: 1%;
  background-color: white;
  border: 1.5px solid #C5C5C5;
  border-radius: 28px;
  height: 1.8rem;
  box-shadow: none;
  color: #C5C5C5;
  :hover {
    background-color: #00BEE6;
    border: 1.5px solid #00BEE6;
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