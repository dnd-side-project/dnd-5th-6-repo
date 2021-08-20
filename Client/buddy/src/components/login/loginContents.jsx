import NaverLogin from "components/login/naverLogin";
import React from "react";
import styles from "./login.module.css";
import { LoginCharter } from "icons";
import KakaoLogin from "./kakaoLogin";
import { findByLabelText } from "@testing-library/react";
import styled from "styled-components";

const SectionBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f9feff;
  z-index: -1;
`;

function LoginContents() {
  return (
    <>
    <SectionBox>
    <div style={{margin:85}}></div>
      <div>
        <p className={styles.write}>반가워요!</p>
        <p className={styles.write}>버디와 함께</p>
        <p className={styles.write}>운동을 기록해볼까요?</p>
      </div>
      <div className={styles.Logincharter}>
        <LoginCharter></LoginCharter>
      </div>
      <div className={styles.location}>
        <KakaoLogin></KakaoLogin>
      </div>
      <div className={styles.location}>
        <NaverLogin></NaverLogin>
      </div>
      </SectionBox>
    </>
  );
}

export default LoginContents;