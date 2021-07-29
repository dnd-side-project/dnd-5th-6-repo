import React from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import styles from "./login.module.css";
import { ADD_KAKAO_TOKEN } from "../../apollo/queries/login/login";
const { Kakao } = window;

function KakaoLogin() {
  const history = useHistory();

  const [addToken, { loading, error, data }] = useMutation(ADD_KAKAO_TOKEN, {
    onCompleted: (token) => {
      if (token !== false) {
        localStorage.setItem("Token", JSON.parse(token.kakaoLogin).JWT);
        history.push("/");
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
      <button className={styles.kakao} onClick={kakaoLoginClickHandler}>
        카카오로 로그인
      </button>
    </div>
  );
}

export default KakaoLogin;
