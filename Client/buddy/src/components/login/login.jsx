import NaverLogin from "components/login/naverLogin";
import React from "react";
import styles from "./login.module.css"
import {LoginCharter} from "icons"
import KakaoLogin from "./kakaoLogin";


function LoginContents() {
  return (<>
  <div>
      <p className={styles.write}>반가워요!</p>
      <p className={styles.write}>버디와 함께</p>
      <p className={styles.write}>운동을 기록해 볼까요?</p>
  </div>
  <div className={styles.Logincharter}>
      <LoginCharter></LoginCharter>
  </div>
  <KakaoLogin></KakaoLogin>
  <NaverLogin></NaverLogin>
  </>);
}

export default LoginContents;