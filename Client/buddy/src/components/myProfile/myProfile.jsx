import React from "react";
import styles from "./myProfile.module.css";
import styled from "styled-components";
import { ProfileActive, RightAngleBracket } from "./../../icons";
import Navbar from "components/navBar/navBar";

const SectionBox = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f9feff;
  z-index: -1;
`;
function MyProfile() {
  return (
    <>
    <Navbar></Navbar>
      <SectionBox>
        <div className={styles.profile_box}>
          <div className={styles.profile}>
            <ProfileActive></ProfileActive>
          </div>
        </div>
        <section className={styles.element_section}>
          <div className={styles.element}>
            <span className={styles.element_text}>닉네임</span>
          </div>
          <div className={styles.element}>
            <span className={styles.element_text}>개인정보처리방침</span>
            <div className={styles.bracket}>
              <RightAngleBracket></RightAngleBracket>
            </div>
          </div>
          <div className={styles.element}>
            <span className={styles.element_text}>서비스이용방침</span>
            <div className={styles.bracket}>
              <RightAngleBracket></RightAngleBracket>
            </div>
          </div>
          <div className={styles.element}>
            <span className={styles.element_text_disable}>로그아웃</span>
          </div>
          <div className={styles.element}>
            <span className={styles.element_text_disable}>회원탈퇴</span>
          </div>
        </section>
      </SectionBox>
    </>
  );
}

export default MyProfile;
