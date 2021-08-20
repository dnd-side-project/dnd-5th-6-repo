import React from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import styles from "./login.module.css";
import { ADD_KAKAO_TOKEN } from "../../apollo/queries/login/login";
import styled from "styled-components";
import IMG from "./로그인.png";

const KakaoLoginImgURL = "./KakoLoginImg.svg";

const KakaoLoginImg = styled.div``;

const { Kakao } = window;

function KakaoLogin() {
  const history = useHistory();

  const [addToken, { loading, error, data }] = useMutation(ADD_KAKAO_TOKEN, {
    onCompleted: (token) => {
      if (token !== false) {
        localStorage.setItem("Token", JSON.parse(token.kakaoLogin).JWT);
        history.push("/");
        history.go(0);
      }
    },
  });

  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: function (res) {
        const accessToken = res.access_token;
        addToken({ variables: { accessToken } });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <div>
      {/* 버튼에 함수 연결 추후 이미지로 교체 */}
      {/* <KakaoLoginImg
          style={{ backgroundImage: `url(${KakaoLoginImgURL})` }}
          onClick={kakaoLoginClickHandler}
        ></KakaoLoginImg> */}
      <img src={IMG} onClick={kakaoLoginClickHandler} />
      {/* <button className={styles.kakao} onClick={kakaoLoginClickHandler}>
        카카오로 로그인
      </button> */}
    </div>
  );
}

export default KakaoLogin;
