import React from "react";
import { Link } from "react-router-dom";
import SelectOption from "../components/selectOption/selectOption";
import NavBar from "../components/navBar/navBar";
import Card from "./../components/card/card";

function Main() {
  return (
    <>
      <NavBar></NavBar>
      <SelectOption></SelectOption>
      <Card></Card>
    </>
  );
}

export default Main;
