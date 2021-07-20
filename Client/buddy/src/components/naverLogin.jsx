import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const { naver } = window;
const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY;

const ADD_TOKEN = gql`
  query AddToken($accessToken: String!) {
    naverLogin(accessToken: $accessToken)
  }
`;

function NaverLogin() {
  const [addToken, { loading, error, data }] = useLazyQuery(ADD_TOKEN, {
    onCompleted: (token) => {
      {
        token &&
          localStorage.setItem("jwtToken", JSON.parse(token.naverLogin).JWT);
      }
    },
  });

  const Naver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: `${CLIENT_KEY}`,
      callbackUrl: "http://localhost:8080",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 1, height: "47" },
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    window.location.href.includes("access_token") && GetToken();
    function GetToken() {
      const accessToken = window.location.href.split("=")[1].split("&")[0];
      console.log(accessToken);
      addToken({ variables: { accessToken } });
    }
  };

  useEffect(() => {
    Naver();
    getNaverToken();
  }, []);

  return <div id="naverIdLogin" />;
}

export default NaverLogin;
