import React from "react";
import { useHistory } from "react-router";
import { gql, useLazyQuery } from "@apollo/client";
import styles from "./login.module.css";

const { Kakao } = window;

const ADD_KAKAO_TOKEN = gql`
  query AddToken($accessToken: String!) {
    kakaoLogin(accessToken: $accessToken)
  }
`;

function KakaoLogin() {
  const history = useHistory();
  const { Kakao } = window;

  const [addToken, { loading, error, data }] = useLazyQuery(ADD_KAKAO_TOKEN, {
    onCompleted: (token) => {
      {
        token &&
          localStorage.setItem("Token", JSON.parse(token.kakaoLogin).JWT);
      }
      {
        token && history.push("/");
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
