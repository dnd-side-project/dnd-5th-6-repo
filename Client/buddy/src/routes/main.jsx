import React from "react";
import SelectOption from "../components/selectOption/selectOption";
import NavBar from "../components/navBar/navBar";
import NaverLogin from "../components/login/naverLogin";
import CardList from "./../components/cardList/cardList";

function Main() {
  return (
    <>
      <NavBar></NavBar>
      <NaverLogin></NaverLogin>
      <SelectOption></SelectOption>
      <CardList></CardList>
    </>
  );
}

export default Main;
