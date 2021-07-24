import React from "react";
import SelectOption from "../components/selectOption/selectOption";
import NavBar from "../components/navBar/navBar";
import NaverLogin from "../components/login/naverLogin";
import CardList from "./../components/cardList/cardList";
import CardItem from "../components/cardItem/cardItem";
import KakaoLogin from "../components/login/kakaoLogin";

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
