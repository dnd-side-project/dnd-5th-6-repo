import React, { useState } from "react";
import styles from "./myProfile.module.css";
import styled from "styled-components";
import { ProfileActive, RightAngleBracket } from "./../../icons";
import Navbar from "components/navBar/navBar";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NICKNAME } from "./../../apollo/queries/users/users";
import { LOG_OUT } from "apollo/queries/login/login";
import { TwoButtonModal } from "./../modal/twoButtonModal";

const SectionBox = styled.div`
  position: fixed;
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
  const { data } = useQuery(GET_NICKNAME);
  const [logOut] = useMutation(LOG_OUT);
  const [showModal, setShowModal] = useState(false);

  const doLogOut = () => {
    localStorage.removeItem("Token");
    window.location = "/";
  };

  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
    document.body.style.overflow = "hidden";
  };

  const nickName = data && data["userNickname"];

  return (
    <>
      {showModal ? (
        <TwoButtonModal
          setShowModal={setShowModal}
          message1="정말 로그아웃 하시겠어요?"
          left="로그아웃"
          right="취소"
          link="/"
          func={doLogOut}
        />
      ) : null}
      <Navbar></Navbar>
      <SectionBox>
        <div className={styles.profile_box}>
          <div className={styles.profile}>
            <ProfileActive size={"100"}></ProfileActive>
          </div>
        </div>
        <section className={styles.element_section}>
          <div className={styles.element}>
            <span className={styles.element_text} id={styles.nickName_text}>
              닉네임
            </span>
            <span className={styles.nickName}>{nickName}</span>
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
          <div className={styles.element} onClick={openModal}>
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
