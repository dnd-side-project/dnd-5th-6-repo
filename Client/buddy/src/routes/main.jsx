import React from "react";
import SelectOption from "../components/selectOption/selectOption";
import NavBar from "../components/navBar/navBar";
import NaverLogin from "./../components/login/naverLogin";

function Main() {
  return (
    <>
      <NavBar></NavBar>
      <NaverLogin></NaverLogin>
      <SelectOption></SelectOption>
    </>
  );
}

export default Main;
