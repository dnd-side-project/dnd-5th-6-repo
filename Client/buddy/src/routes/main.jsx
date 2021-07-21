import React from "react";
import { Link } from "react-router-dom";
import SelectOption from "../components/selectOption/selectOption";
import NavBar from "../components/navBar/navBar";
import CardList from "./../components/cardList/cardList";

function Main() {
  return (
    <>
      <NavBar></NavBar>
      <SelectOption></SelectOption>
      <CardList></CardList>
    </>
  );
}

export default Main;
